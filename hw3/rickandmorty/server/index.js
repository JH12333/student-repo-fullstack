const express = require('express');

const app = express();
const port = 3001;
const baseUrl = 'https://rickandmortyapi.com/api';

const pageCache = new Map();
let requestQueue = Promise.resolve();

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

function getLabel(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : 'Unknown';
}

async function fetchPage(resource, page) {
  const key = `${resource}:${page}`;

  if (pageCache.has(key)) {
    return pageCache.get(key);
  }

  const request = requestQueue.then(async () => {
    await sleep(1200);

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await fetch(`${baseUrl}/${resource}?page=${page}`);

      if (response.status === 429 && attempt < 2) {
        const seconds = Number(response.headers.get('retry-after'));

        await sleep(seconds > 0 ? seconds * 1000 : 10000);
        continue;
      }

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data.results) || !Number.isInteger(data.info?.pages)) {
        throw new Error('Invalid API response');
      }

      return data;
    }
  });

  requestQueue = request.catch(() => {});
  pageCache.set(key, request);

  try {
    return await request;
  } catch (error) {
    pageCache.delete(key);
    throw error;
  }
}

async function fetchPages(resource, limit = Infinity) {
  const firstPage = await fetchPage(resource, 1);
  const results = [...firstPage.results];

  for (let page = 2; page <= firstPage.info.pages && results.length < limit; page += 1) {
    const data = await fetchPage(resource, page);
    results.push(...data.results);
  }

  return results.slice(0, limit);
}

function sendApiError(res, error) {
  console.error(error.message);

  res.status(502).json({
    error: 'External API unavailable or rate-limited. Please try later.',
  });
}

app.get('/api/characters', async (req, res) => {
  try {
    const characters = await fetchPages('character', 100);

    res.json(
      characters.map((character, index) => ({
        id: character?.id ?? `missing-${index}`,
        name: getLabel(character?.name),
        image: character?.image || null,
        species: getLabel(character?.species),
        status: getLabel(character?.status),
      }))
    );
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get('/api/species', async (req, res) => {
  try {
    const characters = await fetchPages('character');
    const groups = new Map();

    characters.forEach((character, index) => {
      const species = getLabel(character?.species);

      if (!groups.has(species)) {
        groups.set(species, []);
      }

      groups.get(species).push({
        id: character?.id ?? `missing-${index}`,
        name: getLabel(character?.name),
      });
    });

    const result = Array.from(groups, ([species, members]) => ({
      species,
      count: members.length,
      characters: members,
    }));

    result.sort((a, b) => a.species.localeCompare(b.species));

    res.json(result);
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get('/api/locations', async (req, res) => {
  try {
    const locations = await fetchPages('location');
    const counts = new Map();

    locations.forEach((location) => {
      const type = getLabel(location?.type);
      counts.set(type, (counts.get(type) || 0) + 1);
    });

    const result = Array.from(counts, ([type, count]) => ({
      type,
      count,
    }));

    result.sort((a, b) => b.count - a.count);

    res.json(result);
  } catch (error) {
    sendApiError(res, error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
