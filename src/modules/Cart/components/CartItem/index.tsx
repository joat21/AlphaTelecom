import { useLocation } from 'react-router-dom';
import { Block } from '../../../../UI';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

type CartItemProps = {
  id: string;
  title: string;
  price: number;
};

export const CartItem: React.FC<CartItemProps> = ({ id, title, price }) => {
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();

  return (
    <Block>
      <ul>
        <li>{id}</li>
        <li>{title}</li>
        <li>{price}</li>
      </ul>
    </Block>
  );
};
