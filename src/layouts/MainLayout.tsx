import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { ErrorBoundaryFallback } from '@components/ErrorBoundaryFallback';

import { UserRole } from '@entities/model';
import { selectAuth } from '@store/Auth/selectors';
import { useGetCartQuery } from '@services/cartApi';

const MainLayout: FC = () => {
  const { activeUserId, guestId } = useSelector(selectAuth);
  const id = activeUserId ?? guestId;
  const { data: items, isLoading } = useGetCartQuery(id!);

  if (!items || isLoading) {
    return 'Loading..';
  }

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Header userRole={UserRole.CLIENT} cartTotalCount={items.length} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export default MainLayout;
