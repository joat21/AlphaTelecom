import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Field, FieldProps } from 'formik';
import { Block, ButtonCheckbox } from '@UI';

import { selectConfig } from '@store/TariffConstructor/selectors';
import { setExtraService } from '@store/TariffConstructor/slice';
import { ExtraServiceData } from '@entities/model';

import styles from '../Services/ServiceGroup.module.scss';

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
    <div className={styles['service-group']}>
      <h2>Дополнительные услуги</h2>
      <Block className={styles.services}>
        {extraServicesValuesArray.map((extraService) => (
          <Field key={extraService.id} name={extraService.id}>
            {({ field }: FieldProps) => (
              <ButtonCheckbox
                name={extraService.id}
                label={extraServicesData[extraService.id].label}
                checked={initialValues[extraService.id]}
                onChange={(checked) => {
                  dispatch(
                    setExtraService({
                      serviceName: extraService.id,
                      newValue: checked,
                    })
                  );
                  field.onChange({
                    target: { name: field.name, value: checked },
                  });
                }}
              />
            )}
          </Field>
        ))}
      </Block>
    </div>
  );
};
