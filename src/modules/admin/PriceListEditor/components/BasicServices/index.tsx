import { FC } from 'react';
import { Field, FieldProps } from 'formik';
import { Block, Input } from '@UI';
import { BasicServiceData } from '@entities/model';
import styles from './BasicServices.module.scss';

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
    <Block>
      <h2>Основные услуги</h2>
      {servicesKeysArray.map((service) => (
        <div key={service} className={styles.serv}>
          <span>{servicesData[service].label}</span>
          <div className={styles.price}>
            <Field name={`basicServices.${service}.price`}>
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
            руб. за
            <Field name={`basicServices.${service}.amount`}>
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
          </div>
          {servicesData[service].measureUnit}
        </div>
      ))}
    </Block>
  );
};
