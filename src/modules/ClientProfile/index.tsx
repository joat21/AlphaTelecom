import { ContactsBlock } from '../../components/ContactsBlock';
import { TariffBlock } from '../../components/TariffBlock';
import { BalanceBlock } from '../../components/BalanceBlock';
import { PlusBlock } from '../../components/PlusBlock';
import { RemainsBlock } from '../../components/RemainsBlock';
import { ServicesBlock } from '../../components/ServicesBlock';

import styles from './ClientProfile.module.scss';

export const ClientProfile = () => {
  return (
    <div>
      <ContactsBlock />
      <PlusBlock />
      <ul>
        <li>
          <BalanceBlock />
        </li>
        <li>
          <RemainsBlock />
        </li>
        <li>
          <TariffBlock />
        </li>
        <li>
          <ServicesBlock />{' '}
        </li>
      </ul>
    </div>
  );
};
