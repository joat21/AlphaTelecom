import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  to?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  className,
  variant = 'primary',
  to,
  ...props
}) => {
  const classes = classNames(className, styles.btn, styles[`btn-${variant}`]);

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      <span>{children}</span>
    </button>
  );
};
