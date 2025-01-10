import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { boolean, InferType, number, object, string } from 'yup';

import { Form, Formik } from 'formik';
import { message } from 'antd';
import { TitleInput } from '../TitleInput';
import { PriceInput } from '../PriceInput';
import { Services } from '../Services';
import { StatusRadio } from '../StatusRadio';
import { ImagesController } from '../ImagesController';
import { Block, Button } from '@UI';
import { Loading } from '@components/Loading';

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
  useDeleteTariffMutation,
  useLazyGetTariffQuery,
  useUpdateTariffMutation,
} from '@services/tariffsApi';
import { ROUTES } from '@constants/routes';

import styles from './TariffConstructor.module.scss';

const tariffConstructorSchema = object({
  title: string().required('Поле не может быть пустым'),
  price: number()
    .required('Поле не может быть пустым')
    .min(100, 'Цена не может быть меньше 100₽'),
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
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [deleteTariff] = useDeleteTariffMutation();
  const [getTariff, { isFetching: isTariffFetching }] = useLazyGetTariffQuery();
  const { isLoading: isConfigLoading } = useGetConstructorConfigQuery();
  const { data: servicesData, isLoading: isServicesDataLoading } =
    useGetServicesDataQuery();

  useEffect(() => {
    async function fetchTariffAndSetToState(id: string) {
      const tariff = await getTariff(id).unwrap();
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
    return <Loading />;

  return (
    <>
      {contextHolder}
      <Formik<TariffConstructorFormValues>
        key={tariff.id || 'constructor'}
        initialValues={initialValues}
        validationSchema={tariffConstructorSchema}
        validateOnBlur={false}
        onSubmit={async () => {
          try {
            if (id) {
              await updateTariff(tariff).unwrap();
              messageApi.success({
                content: 'Изменения сохранены',
              });
            } else {
              await createTariff(tariff).unwrap();
              messageApi.success({
                content: 'Тариф создан',
              });
            }
          } catch (error) {
            messageApi.error({
              content: 'Произошла ошибка. Изменения не сохранены',
            });
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className={styles.root}>
            <Block className={styles.top}>
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
              <StatusRadio
                isActive={tariff.isActive}
                onChange={(status) =>
                  dispatch(setIsActive(status === 'Активен'))
                }
              />
            </Block>

            <Services
              servicesData={servicesData}
              initialValues={initialValues}
            />

            <ImagesController
              imageUrl={tariff.imageUrl}
              overviewImageUrl={tariff.overviewImageUrl}
            />

            <div className={styles.bottom}>
              <Button
                className={styles.btn}
                type="submit"
                disabled={isSubmitting}
              >
                {id ? 'Сохранить изменения' : 'Создать'}
              </Button>

              {id && (
                <Button
                  className={styles.btn}
                  style={{ maxWidth: 200 }}
                  onClick={async () => {
                    await deleteTariff(id);
                    navigate('/admin/' + ROUTES.ADMIN.TARIFFS);
                  }}
                >
                  Удалить тариф
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
