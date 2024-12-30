import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './ValidatedFiledWrapper.module.scss';

interface ValidatedFieldWrapperProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

export const ValidatedFieldWrapper: FC<ValidatedFieldWrapperProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={classNames(styles['validated-field-wrapper'], className)}
      {...props}
    >
      {children}
    </div>
  );
};
