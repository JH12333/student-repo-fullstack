import useApi from '../hooks/useApi.js';

function Locations() {
  const {
    data: groups,
    loading,
    error,
  } = useApi('/api/locations');

  if (loading) {
    return <p>Loading locations...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <main>
      <h1>Locations</h1>
      <p>Location types: {groups.length}</p>

      <table className="locations-table">
        <thead>
          <tr>
            <th scope="col">Location Type</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.type}>
              <td>{group.type}</td>
              <td>{group.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Locations;
