import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './Layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import TariffsPage from './pages/TariffListPage';
import TariffConstructorPage from './pages/TariffConstructorPage';
import TariffPage from './pages/TariffPage';
import ClientAuthPage from './pages/ClientAuthPage';
import AdminAuthPage from './pages/AdminAuthPage';

import { useLazyFetchUserByTokenQuery } from './services/authApi';
import { selectUser } from './store/Auth/selectors';
import { UserRole } from './entities/model';

import './App.css';

function App() {
  const [fetchUserByToken] = useLazyFetchUserByTokenQuery();
  const user = useSelector(selectUser);

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
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<h1>Главная</h1>}></Route>
        <Route path="tariffs" element={<TariffsPage />} />
        <Route path="tariffs/:id" element={<TariffPage />} />
        <Route path="tariff-constructor" element={<TariffConstructorPage />} />

        <Route element={<ProtectedRoute requiredRole={UserRole.CLIENT} />}>
          <Route
            path="profile"
            element={
              <>
                <h1>ЛК Клиента</h1>
                <span>{user?.login}</span>
              </>
            }
          />
        </Route>

        <Route path="faq" element={<h1>Часто задаваемые вопросы</h1>} />
      </Route>
      <Route element={<ProtectedRoute requiredRole={UserRole.ADMIN} />}>
        <Route path="admin" element={<h1>ЛК Админа</h1>} />
      </Route>
      <Route path="client-auth" element={<ClientAuthPage />} />
      <Route path="admin-auth" element={<AdminAuthPage />} />
      <Route path="*" element={<h1>404 Page not found</h1>} />
    </Routes>
  );
}

export default App;
