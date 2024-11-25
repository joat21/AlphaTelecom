import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { boolean, InferType, number, object, string } from 'yup';

import { Form, Formik } from 'formik';
import { message } from 'antd';
import { TitleInput } from '../TitleInput';
import { PriceInput } from '../PriceInput';
import { Services } from '../Services';
import { StatusRadio } from '../StatusRadio';
import { Button } from '@UI';

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

import {
  useCreateTariffMutation,
  useLazyGetTariffQuery,
  useUpdateTariffMutation,
} from '@services/tariffsApi';

import styles from './TariffConstructor.module.scss';

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

export type TariffConstructorFormValues = InferType<
  typeof tariffConstructorSchema
>;

export const TariffConstructor: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

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
    }
  }, [id, isConfigLoading, dispatch, getTariff]);

  const tariff = useSelector(selectTariff);
  const [createTariff] = useCreateTariffMutation();
  const [updateTariff] = useUpdateTariffMutation();

  const initialValues: TariffConstructorFormValues = {
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

  return (
    <>
      {contextHolder}
      <Formik<TariffConstructorFormValues>
        key={tariff.id || 'constructor'}
        initialValues={initialValues}
        validationSchema={tariffConstructorSchema}
        validateOnBlur={false}
        onSubmit={async () => {
          if (id) {
            await updateTariff({ ...tariff, imageUrl: '' });
            messageApi.success({
              content: 'Изменения сохранены',
            });
          } else {
            // Добавить возможность загружать картинку
            await createTariff({ ...tariff, imageUrl: '' });
            messageApi.success({
              content: 'Тариф создан',
            });
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className={styles.root}>
            <div className={styles.top}>
              <TitleInput
                value={tariff.title}
                onChange={(e) => {
                  dispatch(setTitle(e.target.value));
                  setFieldValue('title', e.target.value);
                }}
              />
              <PriceInput
                value={tariff.price}
                onChange={(e) => {
                  const price = Number(e.target.value);
                  dispatch(setPrice(price));
                  setFieldValue('price', price);
                }}
              />
            </div>

            <Services
              servicesData={servicesData}
              initialValues={initialValues}
            />

            <div className={styles.bottom}>
              <StatusRadio
                initialValues={initialValues}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(setIsActive(value === 'Активен'));
                  setFieldValue('isActive', value === 'Активен');
                }}
              />

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
    </>
  );
};
