import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import TariffsPage from './pages/TariffListPage';
import TariffConstructorPage from './pages/TariffConstructorPage';
import TariffPage from './pages/TariffPage';
import ClientAuthPage from './pages/ClientAuthPage';
import AdminAuthPage from './pages/AdminAuthPage';
import { ClientProfilePage } from './pages/ClientProfilePage';

import { useLazyFetchUserByTokenQuery } from './services/authApi';
import { UserRole } from './entities/model';
import { ROUTES } from './constants/routes';

import './App.css';

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
        <Route path={ROUTES.PUBLIC.TARIFFS} element={<TariffsPage />} />
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
          <Route path={ROUTES.CLIENT.PROFILE} element={<ClientProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute requiredRole={UserRole.ADMIN} />}>
        <Route path={ROUTES.ADMIN.HOME} element={<h1>ЛК Админа</h1>} />
      </Route>

      <Route path={ROUTES.AUTH.CLIENT} element={<ClientAuthPage />} />
      <Route path={ROUTES.AUTH.ADMIN} element={<AdminAuthPage />} />
      <Route path="*" element={<h1>404 Page not found</h1>} />
    </Routes>
  );
}

export default App;
