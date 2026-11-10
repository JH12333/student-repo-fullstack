import {
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router';

import Home from './pages/Home';
import Characters from './pages/Characters';
import Species from './pages/Species';
import Locations from './pages/Locations';

const App = function App() {
  return (
    <>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/characters">Characters</Link>
        <Link to="/species">Species</Link>
        <Link to="/locations">Locations</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/species" element={<Species />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
