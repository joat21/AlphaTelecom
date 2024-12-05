import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { UserRole } from '@entities/model';

const MainLayout: FC = () => {
  return (
    <>
      <Header userRole={UserRole.CLIENT} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
