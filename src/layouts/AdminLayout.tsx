import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { ErrorBoundaryFallback } from '@components/ErrorBoundaryFallback';

import { UserRole } from '@entities/model';

const AdminLayout: FC = () => {
  return (
    <>
      <Header userRole={UserRole.ADMIN} />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export default AdminLayout;
