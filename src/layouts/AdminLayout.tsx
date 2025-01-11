import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Header } from '@components/Header';
import { ErrorBoundaryFallback } from '@components/ErrorBoundaryFallback';

import { UserRole } from '@entities/model';
import { Block } from '@UI';

const AdminLayout: FC = () => {
  return (
    <>
      <Header userRole={UserRole.ADMIN} />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Outlet />
      </ErrorBoundary>
      <Block style={{ borderRadius: '0', marginTop: 'auto' }} />
    </>
  );
};

export default AdminLayout;
