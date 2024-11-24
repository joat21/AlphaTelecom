import { FC, useEffect } from 'react';
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
  setTariff,
  setTitle,
} from '@store/TariffConstructor/slice';
import {
  useGetConstructorConfigQuery,
  useGetServicesDataQuery,
} from '@services/servicesConfigApi';

import styles from './TariffConstructor.module.scss';
import {
  useCreateTariffMutation,
  useLazyGetTariffQuery,
  useUpdateTariffMutation,
} from '@services/tariffsApi';
import { useParams } from 'react-router-dom';

export const TariffConstructor: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [getTariff, { isFetching: isTariffFetching }] = useLazyGetTariffQuery();
  const { isLoading: isConfigLoading } = useGetConstructorConfigQuery();
  const { data: servicesData, isLoading: isServicesDataLoading } =
    useGetServicesDataQuery();

  useEffect(() => {
    async function fetchTariffAndSetToState(id: string) {
      const { imageUrl, ...tariff } = await getTariff(id).unwrap();
      dispatch(setTariff(tariff));
    }

    if (id && !isConfigLoading) {
      fetchTariffAndSetToState(id);
      // console.log('set local to state');
    }
  }, [isConfigLoading, dispatch]);

  const tariff = useSelector(selectTariff);
  // console.log(tariff, 'tariff from state');

  const [createTariff] = useCreateTariffMutation();
  const [updateTariff] = useUpdateTariffMutation();

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

  const initialValues = {
    title: tariff.title,
    price: tariff.price,
    isActive: tariff.isActive,
    ...tariff.basicServices,
    ...tariff.unlimitedApps,
    ...tariff.extraServices,
  };

  if (
    isConfigLoading ||
    isServicesDataLoading ||
    !servicesData ||
    isTariffFetching
  )
    return 'Loading...';

  // console.log(initialValues, 'init');

  const options = [
    { label: 'Активен', value: 'Активен' },
    { label: 'В архиве', value: 'В архиве' },
  ];

  return (
    <Formik<TariffConstructorFormValues>
      key={tariff.id || 'constructor'}
      initialValues={initialValues}
      validationSchema={tariffConstructorSchema}
      validateOnBlur={false}
      onSubmit={async () => {
        if (id) {
          await updateTariff({ ...tariff, imageUrl: '' });
        } else {
          // Добавить возможность загружать картинку
          await createTariff({ ...tariff, imageUrl: '' });
        }
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
              initialValues={initialValues}
            />
            <UnlimitedTraffic
              unlimitedAppsData={servicesData[0].unlimitedAppsData}
              initialValues={initialValues}
            />
            <ExtraServices
              extraServicesData={servicesData[0].extraServicesData}
              initialValues={initialValues}
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
                    defaultValue={
                      initialValues.isActive ? 'Активен' : 'В архиве'
                    }
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
              {id ? 'Сохранить изменения' : 'Создать'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
