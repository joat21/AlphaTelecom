import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { UserRole } from '@entities/model';

const AdminLayout: FC = () => {
  return (
    <>
      <Header userRole={UserRole.ADMIN} />
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminLayout;
