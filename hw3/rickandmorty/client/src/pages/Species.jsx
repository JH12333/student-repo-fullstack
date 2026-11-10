import useApi from '../hooks/useApi';

const Species = function Species() {
  const {
    data: groups,
    loading,
    error,
  } = useApi('/api/species');

  if (loading) {
    return <p>Loading species...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <main>
      <h1>Species</h1>
      <p>Total species: {groups.length}</p>

      <div className="species-list">
        {groups.map((group) => (
          <section className="species-group" key={group.species}>
            <h2>
              {group.species} ({group.count})
            </h2>

            <ul>
              {group.characters.map((character) => (
                <li key={character.id}>
                  {character.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Species;
