import { FC } from 'react';
import styles from './Block.module.scss';
import classNames from 'classnames';

interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Block: FC<BlockProps> = ({ className, children, ...props }) => {
  return (
    <div className={classNames(styles.block, className)} {...props}>
      {children}
    </div>
  );
};
