import { useLocation } from 'react-router-dom';
import { Block } from '../../../../UI';
import { useDispatch } from 'react-redux';
import React from 'react';

export const Purchases = () => {
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();

  return <Block>{}</Block>;
};
