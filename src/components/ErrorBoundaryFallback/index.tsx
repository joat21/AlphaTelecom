import { FC } from 'react';
import { Alert } from 'antd';

interface ErrorBoundaryFallbackProps {
  error: Error;
}

export const ErrorBoundaryFallback: FC<ErrorBoundaryFallbackProps> = ({
  error,
}) => {
  return (
    <Alert
      message="Что-то пошло не так"
      description={error.message}
      type="error"
      showIcon
    />
  );
};
