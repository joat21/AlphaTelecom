import { FC } from 'react';
import { Field, FieldProps } from 'formik';
import { Block, Input } from '@UI';
import { ExtraServiceData } from '@entities/model';
import styles from '../PriceListEditor/ServiceGroups.module.scss';

interface ExtraServicesProps {
  services: Record<string, number>;
  servicesData: Record<string, ExtraServiceData>;
}

export const ExtraServices: FC<ExtraServicesProps> = ({
  services,
  servicesData,
}) => {
  const servicesKeysArray = Object.keys(services);
  return (
    <div className={styles['service-group']}>
      <h2>Дополнительные услуги</h2>
      <Block className={styles.services} style={{ padding: '35px 40px' }}>
        {servicesKeysArray.map((service) => (
          <div
            key={service}
            className={styles.service}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span className={styles['service-title']}>
              {servicesData[service].label}
            </span>
            <div className={styles.price}>
              <Field name={`extraServices.${service}`}>
                {({ field }: FieldProps) => (
                  <Input
                    {...field}
                    type="number"
                    className={styles.input}
                    variant="secondary"
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
