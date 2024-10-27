import { Routes, Route } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';

import MainLayout from './layouts/MainLayout';
import TariffsPage from './pages/TariffListPage';
import TariffConstructorPage from './pages/TariffConstructorPage';
import TariffPage from './pages/TariffPage';
import ClientAuthPage from './pages/ClientAuthPage';
import AdminAuthPage from './pages/AdminAuthPage';

import { useGetServicesDataQuery } from './store/api/servicesConfigApi';

import './App.css';

function App() {
  const { isLoading, isError, error } = useGetServicesDataQuery();

  if (isLoading) return 'Загрузка...';

  if (isError) {
    console.log(error);
    if ('status' in error) {
      const fetchError = error as FetchBaseQueryError;
      return <div>Error: {fetchError.status}</div>;
    } else {
      const serializedError = error as SerializedError;
      return <div>Error: {serializedError.message}</div>;
    }
  }

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
