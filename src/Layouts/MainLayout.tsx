import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import Header from '../modules/Header';

const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
