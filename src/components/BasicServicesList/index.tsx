import { FC } from 'react';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import styles from './BasicServicesList.module.scss';
import classNames from 'classnames';
import { Loading } from '@components/Loading';

interface BasicServicesListProps extends React.HTMLAttributes<HTMLUListElement> {
  services: Record<string, number>;
}

export const BasicServicesList: FC<BasicServicesListProps> = ({ services, className }) => {
  const servicesArray = Object.entries(services);
  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  if (isLoading || !servicesData) return <Loading />;

  return (
    <ul className={classNames(styles['basic-services'], className)}>
      {servicesArray.map(([key, value]) => {
        return (
          <li key={key}>
            {value} {servicesData[0].basicServicesData[key].measureUnit}
          </li>
        );
      })}
    </ul>
  );
};
