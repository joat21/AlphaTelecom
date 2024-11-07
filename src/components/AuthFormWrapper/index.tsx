import { ReactNode } from 'react';
import { Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import { Block } from '../../UI';
import styles from './AuthFormWrapper.module.scss';

interface AuthFormWrapperProps<Values extends FormikValues> {
  title: string;
  initialValues: Values;
  validationSchema: any;
  onSubmit: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<void>;
  children: ((props: FormikProps<Values>) => ReactNode) | ReactNode;
}

export const AuthFormWrapper = <Values extends FormikValues>({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: AuthFormWrapperProps<Values>) => {
  return (
    <Block className={styles.wrapper}>
      <h1>{title}</h1>
      <Formik<Values>
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {children}
      </Formik>
    </Block>
  );
};
