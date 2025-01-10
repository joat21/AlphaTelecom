import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Field, FieldProps } from 'formik';
import { Block } from '@UI';
import { EditableSelect } from '../EditableSelect';

import { BasicServiceData } from '@entities/model';
import { selectConfig } from '@store/TariffConstructor/selectors';
import { setBasicService } from '@store/TariffConstructor/slice';

import ServiceGroupStyles from '../Services/ServiceGroup.module.scss';
import styles from './BasicServices.module.scss';

interface BasicServicesProps {
  basicServicesData: Record<string, BasicServiceData>;
  initialValues: any;
}

export const BasicServices: FC<BasicServicesProps> = ({
  basicServicesData,
}) => {
  const dispatch = useDispatch();
  const { basicServices } = useSelector(selectConfig);
  const basicServicesValuesArray = Object.values(basicServices);

  return (
    <div className={ServiceGroupStyles['service-group']}>
      <h2>Основные услуги</h2>
      <Block className={ServiceGroupStyles.services}>
        {basicServicesValuesArray.map((basicService) => (
          <Field key={basicService.id} name={basicService.id}>
            {({ field }: FieldProps) => (
              <div className={styles.wrapper}>
                <label className={styles.label} htmlFor={basicService.id}>
                  {basicServicesData[basicService.id].label + ':'}
                </label>
                <EditableSelect
                  field={field}
                  name={basicService.id}
                  label={basicServicesData[basicService.id].label}
                  options={basicService.values}
                  onSelectChange={(value) => {
                    dispatch(
                      setBasicService({
                        serviceName: basicService.id,
                        newValue: value,
                      })
                    );
                    field.onChange({ target: { name: field.name, value } });
                  }}
                  onInputChange={(e) => {
                    const value = Number(e.target.value);
                    console.log(value, 'value');
                    dispatch(
                      setBasicService({
                        serviceName: basicService.id,
                        newValue: value,
                      })
                    );
                    field.onChange({ target: { name: field.name, value } });
                  }}
                />
              </div>
            )}
          </Field>
        ))}
      </Block>
    </div>
  );
};
