import useApi from '../hooks/useApi';

const Characters = function Characters() {
  const {
    data: characters,
    loading,
    error,
  } = useApi('/api/characters');

  if (loading) {
    return <p>Loading characters...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <main>
      <h1>Characters</h1>
      <p>Total characters: {characters.length}</p>

      <div className="character-grid">
        {characters.map((character) => (
          <article className="character-card" key={character.id}>
            {character.image ? (
              <img
                className="character-image"
                src={character.image}
                alt={character.name}
                loading="lazy"
              />
            ) : (
              <div className="image-fallback">
                Image unavailable
              </div>
            )}

            <div className="character-info">
              <h2>{character.name}</h2>
              <p>Species: {character.species}</p>
              <p>Status: {character.status}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Characters;
