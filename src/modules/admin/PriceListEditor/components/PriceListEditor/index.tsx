import { FC } from 'react';
import { InferType, number, object, Schema } from 'yup';

import { Form, Formik } from 'formik';
import { Button } from '@UI';
import { BasicServices } from '../BasicServices';
import { UnlimitedTraffic } from '../UnlimitedTraffic';
import { ExtraServices } from '../ExtraServices';

import {
  useGetPriceListQuery,
  useGetServicesDataQuery,
  useUpdatePriceListMutation,
} from '@services/servicesConfigApi';

import styles from './PriceListEditor.module.scss';
import { message } from 'antd';

const createBasicServicesSchema = (
  services: Record<
    string,
    {
      price: number;
      amount: number;
    }
  >
) => {
  const schemaShape = Object.fromEntries(
    Object.keys(services).map((service) => [
      service,
      object().shape({
        price: number().required(),
        amount: number().required(),
      }),
    ])
  );

  return object().shape(schemaShape);
};

const createSchemaFromObject = (obj: Record<string, number>) => {
  const shape = Object.keys(obj).reduce<Record<string, Schema<number>>>(
    (acc, key) => {
      acc[key] = number().required();
      return acc;
    },
    {}
  );
  return object().shape(shape);
};

export const PriceListEditor: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [updatePriceList] = useUpdatePriceListMutation();
  const { data: priceList, isLoading: isPriceListLoading } =
    useGetPriceListQuery();
  const { data: serivcesData, isLoading: isServicesDataLoading } =
    useGetServicesDataQuery();

  if (
    isPriceListLoading ||
    !priceList ||
    isServicesDataLoading ||
    !serivcesData
  )
    return 'Loading...';

  const priceListEditorSchema = object({
    basicServices: createBasicServicesSchema(priceList[0].basicServices),
    unlimitedApps: createSchemaFromObject(priceList[0].unlimitedApps),
    extraServices: createSchemaFromObject(priceList[0].extraServices),
  });

  type PriceListEditorFormValues = InferType<typeof priceListEditorSchema>;

  const { id, ...initialValues } = priceList[0];

  return (
    <>
      {contextHolder}
      <Formik<PriceListEditorFormValues>
        initialValues={initialValues}
        validationSchema={priceListEditorSchema}
        validateOnBlur={false}
        onSubmit={async (values) => {
          try {
            await updatePriceList(values).unwrap();
            messageApi.success({
              content: 'Изменения сохранены',
            });
          } catch (error) {
            console.error('rejected', error);
            messageApi.info({
              content: 'Произошла ошибка. Изменения не сохранены',
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.root}>
            <div className={styles.serivces}>
              <BasicServices
                serivces={priceList[0].basicServices}
                servicesData={serivcesData[0].basicServicesData}
              />
              <UnlimitedTraffic
                services={priceList[0].unlimitedApps}
                servicesData={serivcesData[0].unlimitedAppsData}
              />
              <ExtraServices
                services={priceList[0].extraServices}
                servicesData={serivcesData[0].extraServicesData}
              />
            </div>

            <Button
              className={styles.btn}
              type="submit"
              disabled={isSubmitting}
            >
              Сохранить изменения
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
