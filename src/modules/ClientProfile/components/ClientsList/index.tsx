import { Contacts } from '../Contacts';
import { Block, Button, Container } from '../../../../UI';
import styles from './ClientsList.module.scss';

export const ClientsList = () => {
  return (
    <Block className={styles.block}>
      <Container className={styles.wrapper}>
        <Contacts />
        <Button className={styles['button-plus']}>+</Button>
      </Container>
    </Block>
  );
};
