import { Contacts } from '../Contacts';
import { Block, Button } from '../../../../UI';
import styles from './ClientsList.module.scss';

export const ClientsList = () => {
  return (
    <Block className={styles.block}>
      <Contacts />

      <Button className={styles['button-plus']}>+</Button>
    </Block>
  );
};
