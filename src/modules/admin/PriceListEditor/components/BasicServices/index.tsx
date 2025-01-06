import { FC } from 'react';
import { Field, FieldProps } from 'formik';
import { Block, Input } from '@UI';
import { BasicServiceData } from '@entities/model';
import styles from '../PriceListEditor/ServiceGroups.module.scss';

interface BasicServicesProps {
  serivces: Record<
    string,
    {
      price: number;
      amount: number;
    }
  >;
  servicesData: Record<string, BasicServiceData>;
}

export const BasicServices: FC<BasicServicesProps> = ({
  serivces,
  servicesData,
}) => {
  const servicesKeysArray = Object.keys(serivces);
  return (
    <div className={styles['service-group']}>
      <h2>Основные услуги</h2>
      <Block className={styles.services}>
        {servicesKeysArray.map((service) => (
          <div key={service} className={styles.service}>
            <span className={styles['service-title']}>
              {servicesData[service].label}
            </span>
            <div className={styles.price}>
              <Field name={`basicServices.${service}.amount`}>
                {({ field }: FieldProps) => (
                  <Input
                    {...field}
                    className={styles.input}
                    variant="secondary"
                    type="number"
                    min={0}
                    onChange={(e) =>
                      field.onChange({
                        target: {
                          name: field.name,
                          value: Number(e.target.value),
                        },
                      })
                    }
                  />
                )}
              </Field>
              <span style={{ textTransform: 'uppercase' }}>
                {servicesData[service].measureUnit}
              </span>{' '}
              за
              <Field name={`basicServices.${service}.price`}>
                {({ field }: FieldProps) => (
                  <Input
                    {...field}
                    className={styles.input}
                    variant="secondary"
                    type="number"
                    min={0}
                    onChange={(e) =>
                      field.onChange({
                        target: {
                          name: field.name,
                          value: Number(e.target.value),
                        },
                      })
                    }
                  />
                )}
              </Field>
              руб.
            </div>
          </div>
        ))}
      </Block>
    </div>
  );
};
