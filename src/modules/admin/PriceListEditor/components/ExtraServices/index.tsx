import { FC } from 'react';
import { Field, FieldProps } from 'formik';
import { Block, Input } from '@UI';
import { UnlimitedAppData } from '@entities/model';
import styles from './ExtraServices.module.scss';

interface ExtraServicesProps {
  services: Record<string, number>;
  servicesData: Record<string, UnlimitedAppData>;
}

export const ExtraServices: FC<ExtraServicesProps> = ({
  services,
  servicesData,
}) => {
  const servicesKeysArray = Object.keys(services);
  return (
    <Block>
      <h2>Дополнительно</h2>
      {servicesKeysArray.map((service) => (
        <div key={service} className={styles.serv}>
          <span>{servicesData[service].label}</span>
          <div className={styles.price}>
            <Field name={`extraServices.${service}`}>
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="number"
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
  );
};
