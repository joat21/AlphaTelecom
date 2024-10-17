import { FC } from 'react';
import { Container } from '../../UI';
import AdminAuth from '../../modules/AdminAuth';

const AdminAuthPage: FC = () => {
  return (
    <Container>
      <AdminAuth />
    </Container>
  );
};

export default AdminAuthPage;
