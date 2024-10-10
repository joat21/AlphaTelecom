import { FC, ReactNode } from 'react';
import styles from './PageTitle.module.scss';

interface PageTitleProps {
  children: ReactNode;
}

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};
