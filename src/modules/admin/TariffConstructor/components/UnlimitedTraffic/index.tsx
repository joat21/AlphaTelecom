import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Field, FieldProps } from 'formik';
import { Block, ButtonCheckbox } from '@UI';

import { selectConfig } from '@store/TariffConstructor/selectors';
import { setUnlimitedApp } from '@store/TariffConstructor/slice';
import { UnlimitedAppData } from '@entities/model';

import styles from '../Services/ServiceGroup.module.scss';

interface UnlimitedTrafficProps {
  unlimitedAppsData: Record<string, UnlimitedAppData>;
  initialValues: any;
}

export const UnlimitedTraffic: FC<UnlimitedTrafficProps> = ({
  unlimitedAppsData,
  initialValues,
}) => {
  const dispatch = useDispatch();
  const { unlimitedApps } = useSelector(selectConfig);
  const unlimitedAppsValuesArray = Object.values(unlimitedApps);

  return (
    <div className={styles['service-group']}>
      <h2>Безлимитный трафик</h2>
      <Block className={styles.services}>
        {unlimitedAppsValuesArray.map((unlimitedApp) => (
          <Field key={unlimitedApp.id} name={unlimitedApp.id}>
            {({ field }: FieldProps) => (
              <ButtonCheckbox
                name={unlimitedApp.id}
                label={unlimitedAppsData[unlimitedApp.id].label}
                checked={initialValues[unlimitedApp.id]}
                onChange={(checked) => {
                  dispatch(
                    setUnlimitedApp({
                      serviceName: unlimitedApp.id,
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
