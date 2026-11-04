import { useEffect, useState } from 'react';

const useApi = function useApi(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const load = async function load() {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };

    load();

    return () => controller.abort();
  }, [url]);

  return {
    data,
    error,
    loading: data === null && !error,
  };
};

export default useApi;
