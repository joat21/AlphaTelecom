import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './Layouts/MainLayout';
import TariffsPage from './pages/TariffListPage';
import TariffConstructorPage from './pages/TariffConstructorPage';
import TariffPage from './pages/TariffPage';
import ClientAuthPage from './pages/ClientAuthPage';
import AdminAuthPage from './pages/AdminAuthPage';

import { fetchServicesData } from './store/servicesData/thunks';

import './App.css';
import { selectServicesData } from './store/servicesData/selectors';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectServicesData);

  useEffect(() => {
    dispatch(fetchServicesData());
  }, []);

  if (isLoading) return 'Загрузка...';

  return (
    <Routes>
      {/* пока главной страницей оставлю ЛК клиента, потом решим как лучше сделать */}
      {/* и в целом нужно будет роутинг потом донастроить */}
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<h1>Главная</h1>}></Route>
        <Route path="tariffs" element={<TariffsPage />} />
        <Route path="tariffs/:id" element={<TariffPage />} />
        <Route path="tariff-constructor" element={<TariffConstructorPage />} />
        <Route path="profile" element={<h1>ЛК Клиента</h1>} />
        <Route path="faq" element={<h1>Часто задаваемые вопросы</h1>} />
      </Route>
      <Route path="client-auth" element={<ClientAuthPage />} />
      <Route path="admin-auth" element={<AdminAuthPage />} />
      <Route path="*" element={<h1>404 Page not found</h1>} />
    </Routes>
  );
}

export default App;
