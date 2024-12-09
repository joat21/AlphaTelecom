import { FC } from 'react';
import { Field, FieldProps } from 'formik';
import { Block, Input } from '@UI';
import { UnlimitedAppData } from '@entities/model';
import styles from './UnlimitedTarffic.module.scss';

interface UnlimitedTrafficProps {
  services: Record<string, number>;
  servicesData: Record<string, UnlimitedAppData>;
}

export const UnlimitedTraffic: FC<UnlimitedTrafficProps> = ({
  services,
  servicesData,
}) => {
  const servicesKeysArray = Object.keys(services);
  return (
    <Block>
      <h2>Безлимит</h2>
      {servicesKeysArray.map((service) => (
        <div key={service} className={styles.serv}>
          <span>{servicesData[service].label}</span>
          <div className={styles.price}>
            <Field name={`unlimitedApps.${service}`}>
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
