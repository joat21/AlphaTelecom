import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Field, FieldProps } from 'formik';
import { Block, Select } from '@UI';

import { BasicServiceData } from '@entities/model';
import { selectConfig } from '@modules/client/TariffConstructor/store/selectors';
import { setBasicService } from '@modules/client/TariffConstructor/store/slice';

import styles from './BasicServices.module.scss';

interface BasicServicesProps {
  basicServicesData: Record<string, BasicServiceData>;
}

export const BasicServices: FC<BasicServicesProps> = ({
  basicServicesData,
}) => {
  const dispatch = useDispatch();
  const { basicServices } = useSelector(selectConfig);
  const basicServicesValuesArray = Object.values(basicServices);

  return (
    <Block className={styles.services}>
      <h2>Основные услуги</h2>
      {basicServicesValuesArray.map((basicService) => (
        <Field key={basicService.id} name={basicService.id}>
          {({ field }: FieldProps) => (
            <Select
              name={basicService.id}
              label={basicServicesData[basicService.id].label}
              options={basicService.values}
              onChange={(value) => {
                dispatch(
                  setBasicService({
                    serviceName: basicService.id,
                    newValue: value,
                  })
                );
                field.onChange({ target: { name: field.name, value } });
              }}
            />
          )}
        </Field>
      ))}
    </Block>
  );
};
