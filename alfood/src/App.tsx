import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurantes from './paginas/Administracao/Restaurantes/FormularioRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/restaurantes/administracao" element={<AdministracaoRestaurantes />} />
      <Route path="/restaurantes/administracao/novo" element={<FormularioRestaurantes />} />
      <Route path="/restaurantes/administracao/:id" element={<FormularioRestaurantes />} />
    </Routes>
  );
}

export default App;
