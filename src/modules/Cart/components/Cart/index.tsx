import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { CartItem } from '../CartItem';
import { selectCart } from '../../../../store/Cart/selectors';
import { useSelector } from 'react-redux';
import { Block } from '../../../../UI';

export const Cart = () => {
  const { items } = useSelector(selectCart);

  return (
    <ul>
      {items.map((item: any) => (
        <li key={item.id}>
          <CartItem {...item} />
        </li>
      ))}
    </ul>
  );
};
