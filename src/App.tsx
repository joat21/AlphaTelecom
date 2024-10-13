import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './Layouts/MainLayout';
import TariffsPage from './pages/TariffsPage/components/TariffsPage';
import TariffConstructorPage from './pages/TariffConstructorPage';

function App() {
  return (
    <Routes>
      {/* пока главной страницей оставлю ЛК клиента, потом решим как лучше сделать */}
      {/* и в целом нужно будет роутинг потом донастроить */}
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<h1>ЛК клиента</h1>}></Route>
        <Route path="tariffs" element={<TariffsPage />} />
        <Route path="tariffs/:id" element={<h1>Тариф такой то</h1>} />
        <Route path="tariff-constructor" element={<TariffConstructorPage />} />
        <Route path="client-auth" element={<h1>Вход для клиентов</h1>} />
        <Route path="admin-auth" element={<h1>Вход для операторов</h1>} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
