import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Registro from './components/registro';
import ReservarEspacio from './components/reservarEspacio';
import GestionEspacios from './components/gestionEspacios';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/reserva-espacio" element={<ReservarEspacio />} />
          <Route path="/gestion-espacio" element={<GestionEspacios />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
