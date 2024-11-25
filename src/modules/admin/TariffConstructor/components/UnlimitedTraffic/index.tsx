import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Field, FieldProps } from 'formik';
import { Block, Checkbox } from '@UI';

import { selectConfig } from '@store/TariffConstructor/selectors';
import { setUnlimitedApp } from '@store/TariffConstructor/slice';
import { UnlimitedAppData } from '@entities/model';

import styles from './UnlimitedTraffic.module.scss';

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
    <Block className={styles.services}>
      <h2>Безлимитный трафик</h2>
      {unlimitedAppsValuesArray.map((unlimitedApp) => (
        <Field key={unlimitedApp.id} name={unlimitedApp.id}>
          {({ field }: FieldProps) => (
            <Checkbox
              name={unlimitedApp.id}
              label={unlimitedAppsData[unlimitedApp.id].label}
              defaultChecked={initialValues[unlimitedApp.id]}
              onChange={(e) => {
                dispatch(
                  setUnlimitedApp({
                    serviceName: unlimitedApp.id,
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
