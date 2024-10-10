import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';

const MainLayout: FC = () => {
  return (
    <>
      <h1>Тут будет шапка</h1>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
