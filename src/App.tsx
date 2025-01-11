import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { PageNotFound } from './components/PageNotFound';

import {
  AuthPage as AdminAuthPage,
  TariffConstructorPage as AdminTariffConstructorPage,
  ClientsListPage,
  PriceListEditorPage,
  ClientInfoPage,
} from 'pages/admin';
import {
  AuthPage as ClientAuthPage,
  ProfilePage,
  TariffConstructorPage as ClientTariffConstructorPage,
  TariffsListPage,
  TariffPage,
  CartPage,
  ChangeTariffPage,
  MainPage,
  OrderDetailsPage,
} from 'pages/client';

import { useLazyFetchUserByTokenQuery } from '@services/authApi';
import { UserRole } from '@entities/model';
import { ROUTES } from '@constants/routes';
import { selectAuth } from '@store/Auth/selectors';

import './App.css';
import { TariffsList } from '@modules/admin/TariffsList';
import { setGuestId } from '@store/Auth/slice';

function App() {
  const dispatch = useDispatch();
  const { activeUserId, tokens, guestId } = useSelector(selectAuth);
  const [fetchUserByToken] = useLazyFetchUserByTokenQuery();

  useEffect(() => {
    if (activeUserId) {
      fetchUserByToken(tokens[activeUserId]);
    } else if (!guestId) {
      dispatch(setGuestId(uuidv4()));
    }
  }, [fetchUserByToken]);

  return (
    <Routes>
      <Route path={ROUTES.PUBLIC.BASE} element={<MainLayout />}>
        <Route path={ROUTES.PUBLIC.HOME} element={<MainPage />}></Route>
        <Route path={ROUTES.PUBLIC.TARIFFS} element={<TariffsListPage />} />
        <Route path={ROUTES.PUBLIC.TARIFF_OVERVIEW} element={<TariffPage />} />

        <Route
          path={ROUTES.PUBLIC.TARIFF_CONSTRUCTOR}
          element={<ClientTariffConstructorPage />}
        />
        <Route
          path={ROUTES.PUBLIC.FAQ}
          element={<h1>Часто задаваемые вопросы</h1>}
        />
        <Route path="userdata-form" element={<OrderDetailsPage />} />
        <Route path={ROUTES.PUBLIC.CART} element={<CartPage />} />
        <Route
          path={ROUTES.PUBLIC.CHANGE_TARIFF}
          element={<ChangeTariffPage />}
        />

        <Route element={<ProtectedRoute requiredRole={UserRole.CLIENT} />}>
          <Route path={ROUTES.CLIENT.PROFILE} element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute requiredRole={UserRole.ADMIN} />}>
        <Route path={ROUTES.ADMIN.BASE} element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.HOME} element={<h1>ЛК Админа</h1>} />
          <Route path={ROUTES.ADMIN.TARIFFS} element={<TariffsList />} />
          <Route path={ROUTES.ADMIN.CLIENTS} element={<ClientsListPage />} />
          <Route
            path={ROUTES.ADMIN.TARIFF_CONSTRUCTOR}
            element={<AdminTariffConstructorPage />}
          />
          <Route
            path={ROUTES.ADMIN.TARIFF_OVERVIEW}
            element={<AdminTariffConstructorPage />}
          />
          <Route
            path={ROUTES.ADMIN.PRICE_LIST}
            element={<PriceListEditorPage />}
          />
          <Route path={ROUTES.ADMIN.CLIENT_INFO} element={<ClientInfoPage />} />
        </Route>
      </Route>

      <Route path={ROUTES.AUTH.CLIENT} element={<ClientAuthPage />} />
      <Route path={ROUTES.AUTH.ADMIN} element={<AdminAuthPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
