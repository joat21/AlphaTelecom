import { FC, useState } from 'react';
import PhoneForm from './PhoneForm';
import VerificationCodeForm from './VerificationCodeForm';

export const Auth: FC = () => {
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  return (
    <>
      {!isPhoneSubmitted && (
        <PhoneForm setIsPhoneSubmitted={setIsPhoneSubmitted} />
      )}
      {isPhoneSubmitted && <VerificationCodeForm />}
    </>
  );
};
