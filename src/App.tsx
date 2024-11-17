import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthPage as AdminAuthPage } from 'pages/admin';
import {
  AuthPage as ClientAuthPage,
  ProfilePage,
  TariffConstructorPage,
  TariffsListPage,
  TariffPage,
} from 'pages/client';

import { useLazyFetchUserByTokenQuery } from './services/authApi';
import { UserRole } from './entities/model';
import { ROUTES } from './constants/routes';

import './App.css';
import AdminLayout from 'layouts/AdminLayout';
import { TariffsList } from '@modules/admin/TariffsList';

function App() {
  const [fetchUserByToken] = useLazyFetchUserByTokenQuery();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserByToken();
    }
  }, [fetchUserByToken]);

  return (
    <Routes>
      {/* пока главной страницей оставлю ЛК клиента, потом решим как лучше сделать */}
      {/* и в целом нужно будет роутинг потом донастроить */}
      <Route path={ROUTES.PUBLIC.BASE} element={<MainLayout />}>
        <Route path={ROUTES.PUBLIC.HOME} element={<h1>Главная</h1>}></Route>
        <Route path={ROUTES.PUBLIC.TARIFFS} element={<TariffsListPage />} />
        <Route path={ROUTES.PUBLIC.TARIFF_OVERVIEW} element={<TariffPage />} />
        <Route
          path={ROUTES.PUBLIC.TARIFF_CONSTRUCTOR}
          element={<TariffConstructorPage />}
        />
        <Route
          path={ROUTES.PUBLIC.FAQ}
          element={<h1>Часто задаваемые вопросы</h1>}
        />

        <Route element={<ProtectedRoute requiredRole={UserRole.CLIENT} />}>
          <Route path={ROUTES.CLIENT.PROFILE} element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path={ROUTES.ADMIN.BASE} element={<AdminLayout />}>
        <Route element={<ProtectedRoute requiredRole={UserRole.ADMIN} />}>
          <Route path={ROUTES.ADMIN.HOME} element={<h1>ЛК Админа</h1>} />
          <Route path={ROUTES.ADMIN.TARIFFS} element={<TariffsList />} />
        </Route>
      </Route>

      <Route path={ROUTES.AUTH.CLIENT} element={<ClientAuthPage />} />
      <Route path={ROUTES.AUTH.ADMIN} element={<AdminAuthPage />} />
      <Route path="*" element={<h1>404 Page not found</h1>} />
    </Routes>
  );
}

export default App;
