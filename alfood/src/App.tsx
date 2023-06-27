import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurantes from './paginas/Administracao/Restaurantes/FormularioRestaurantes';
import AdmDashboard from './paginas/Administracao/AdmDashboard';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/restaurantes/' element={<AdmDashboard />}>
        <Route path="administracao/" element={<AdministracaoRestaurantes />} />
        <Route path="administracao/novo" element={<FormularioRestaurantes />} />
        <Route path="administracao/:id" element={<FormularioRestaurantes />} />
      </Route>

    </Routes>
  );
}
export default App;
