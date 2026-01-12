import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;

// TEST GIT CHANGE
