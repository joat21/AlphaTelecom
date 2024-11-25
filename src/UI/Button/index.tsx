import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  to?: string;
  state?: any;
}

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  className,
  variant = 'primary',
  to,
  state,
  onClick,
  ...props
}) => {
  const classes = classNames(className, styles.btn, styles[`btn-${variant}`]);

  if (to) {
    return (
      <Link className={classes} to={to} state={state} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
};
