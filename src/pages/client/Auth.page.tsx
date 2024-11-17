import { FC, useState } from 'react';
import VerificationCodeForm from '@modules/client/VerificationCodeForm';
import PhoneForm from '@modules/client/PhoneForm';
import { Container } from '@UI';

export const AuthPage: FC = () => {
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
