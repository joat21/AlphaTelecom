import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Field, FieldProps } from 'formik';
import { Block, Checkbox } from '@UI';

import { selectConfig } from '@store/TariffConstructor/selectors';
import { setExtraService } from '@store/TariffConstructor/slice';
import { ExtraServiceData } from '@entities/model';

import styles from './ExtraServices.module.scss';

interface ExtraServicesProps {
  extraServicesData: Record<string, ExtraServiceData>;
  initialValues: any;
}

export const ExtraServices: FC<ExtraServicesProps> = ({
  extraServicesData,
  initialValues,
}) => {
  const dispatch = useDispatch();
  const { extraServices } = useSelector(selectConfig);
  const extraServicesValuesArray = Object.values(extraServices);

  return (
    <Block className={styles.services}>
      <h2>Дополнительные услуги</h2>
      {extraServicesValuesArray.map((extraService) => (
        <Field key={extraService.id} name={extraService.id}>
          {({ field }: FieldProps) => (
            <Checkbox
              name={extraService.id}
              label={extraServicesData[extraService.id].label}
              defaultChecked={initialValues[extraService.id]}
              onChange={(e) => {
                dispatch(
                  setExtraService({
                    serviceName: extraService.id,
                    newValue: e.target.checked,
                  })
                );
                field.onChange(e);
              }}
            />
          )}
        </Field>
      ))}
    </Block>
  );
};
