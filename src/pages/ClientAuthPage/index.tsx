import { FC, useState } from 'react';
import PhoneForm from '../../modules/PhoneForm';
import VerificationCodeForm from '../../modules/VerificationCodeForm';
import { Container } from '../../UI';

const ClientAuthPage: FC = () => {
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);

  return (
    <Container>
      {!isPhoneSubmitted && (
        <PhoneForm setIsPhoneSubmitted={setIsPhoneSubmitted} />
      )}
      {isPhoneSubmitted && <VerificationCodeForm />}
    </Container>
  );
};

export default ClientAuthPage;
