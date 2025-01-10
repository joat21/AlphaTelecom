import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { UserRole } from '@entities/model';
import { useSelector } from 'react-redux';
import { selectAuth } from '@store/Auth/selectors';
import { useGetCartQuery } from '@services/cartApi';
import { Loading } from '@components/Loading';

const MainLayout: FC = () => {
  const { activeUserId, guestId } = useSelector(selectAuth);
  const id = activeUserId ?? guestId;
  const { data: items, isLoading } = useGetCartQuery(id!);

  if (!items || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header userRole={UserRole.CLIENT} cartTotalCount={items.length} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
