import React, { FC, useState } from 'react';
import PhoneForm from '../../../PhoneForm';
import { Block } from '../../../../UI';
import VerificationCodeForm from '../../../VerificationCodeForm';
import styles from './Contacts.module.scss';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/selectors';

export const Contacts: FC = () => {
  const { totalPrice } = useSelector(selectCart);

  return (
    <Block>
      <h2>ITOGO</h2>
      <span>{totalPrice}</span>
    </Block>
  );
};
