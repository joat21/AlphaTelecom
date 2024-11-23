import { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { boolean, InferType, number, object, string } from 'yup';

import { BasicServices } from '../BasicServices';
import { UnlimitedTraffic } from '../UnlimitedTraffic';
import { ExtraServices } from '../ExtraServices';
import { Button, Input, Radio } from '@UI';

import { selectTariff } from '@store/TariffConstructor/selectors';
import {
  setIsActive,
  setPrice,
  setTitle,
} from '@store/TariffConstructor/slice';
import {
  useGetConstructorConfigQuery,
  useGetServicesDataQuery,
} from '@services/servicesConfigApi';

import styles from './TariffConstructor.module.scss';
import { useCreateTariffMutation } from '@services/tariffsApi';
// import { Radio } from 'antd';

export const TariffConstructor: FC = () => {
  const dispatch = useDispatch();
  const { isLoading: isConfigLoading } = useGetConstructorConfigQuery();
  const { data: servicesData, isLoading: isServicesDataLoading } =
    useGetServicesDataQuery();

  const tariff = useSelector(selectTariff);

  const [createTariff] = useCreateTariffMutation();

  const tariffConstructorSchema = object({
    title: string().required('Обязательно'),
    price: number().required('Обязательно'),
    isActive: boolean(),
    internet: number(),
    minutes: number(),
    sms: number(),
    unlimitedSocial: boolean(),
    unlimitedVideo: boolean(),
    unlimitedMusic: boolean(),
    intercityCalls: boolean(),
  });

  type TariffConstructorFormValues = InferType<typeof tariffConstructorSchema>;

  if (isConfigLoading || isServicesDataLoading || !servicesData)
    return 'Loading...';

  const initialValues = {
    title: tariff.title,
    price: tariff.price,
    isActive: tariff.isActive,
    ...tariff.basicServices,
    ...tariff.unlimitedApps,
    ...tariff.extraServices,
  };

  const options = [
    { label: 'Активен', value: 'Активен' },
    { label: 'В архиве', value: 'В архиве' },
  ];

  return (
    <Formik<TariffConstructorFormValues>
      initialValues={initialValues}
      validationSchema={tariffConstructorSchema}
      validateOnBlur={false}
      onSubmit={async () => {
        // Добавить возможность загружать картинку
        await createTariff({ ...tariff, imageUrl: '' });
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles.root}>
          <div className={styles.top}>
            <div>
              <label className={styles['title-label']} htmlFor="title">
                <span>Название тарифа</span>
                <ErrorMessage name="title" />
              </label>
              <Field name="title">
                {() => (
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Название"
                    value={tariff.title}
                    onChange={(e) => {
                      dispatch(setTitle(e.target.value));
                      setFieldValue('title', e.target.value);
                    }}
                  />
                )}
              </Field>
            </div>

            <label>
              Цена тарифа, ₽
              <Field name="price">
                {() => (
                  <Input
                    type="number"
                    name="price"
                    placeholder="Цена"
                    value={tariff.price}
                    onChange={(e) => {
                      const price = Number(e.target.value);
                      dispatch(setPrice(price));
                      setFieldValue('price', price);
                    }}
                  />
                )}
              </Field>
            </label>
          </div>

          <div className={styles.services}>
            <BasicServices
              basicServicesData={servicesData[0].basicServicesData}
            />
            <UnlimitedTraffic
              unlimitedAppsData={servicesData[0].unlimitedAppsData}
            />
            <ExtraServices
              extraServicesData={servicesData[0].extraServicesData}
            />
          </div>

          <div className={styles.bottom}>
            <div className={styles.status}>
              <span>Статус</span>
              <Field name="isActive">
                {() => (
                  <Radio.Group
                    name="isActive"
                    options={options}
                    defaultValue="В архиве"
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch(setIsActive(value === 'Активен'));
                      setFieldValue('isActive', value === 'Активен');
                    }}
                  />
                )}
              </Field>
            </div>

            <Button
              className={styles.btn}
              type="submit"
              disabled={isSubmitting}
            >
              Далее
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
