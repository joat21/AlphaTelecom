import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import styles from './Loading.module.scss';

export const Loading: FC = () => (
  <Flex align="center" gap="middle" className={styles.flex}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </Flex>
);
