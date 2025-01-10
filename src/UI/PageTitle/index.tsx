import { FC } from 'react';
import styles from './PageTitle.module.scss';
import classNames from 'classnames';

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const PageTitle: FC<PageTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={classNames(styles.title, className)} {...props}>
      {children}
    </h1>
  );
};
