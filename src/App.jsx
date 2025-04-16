// App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import ClientePage from './pages/ClientePage';
import MotocicletasPage from './pages/MotocicletasPage';
import OrdenesServicioPage from './pages/OrdenesServicioPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-16"> {/* Espacio para el navbar fijo */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/clientes" element={<ClientePage />} />
          <Route path="/motocicletas" element={<MotocicletasPage />} />
          <Route path="/ordenes" element={<OrdenesServicioPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;