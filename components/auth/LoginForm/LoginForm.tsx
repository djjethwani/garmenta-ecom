import { Formik } from 'formik';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { Button, Input, PageLoader } from '@/components/ui';
import { useToast } from '@/contexts';
import { useLogin } from '@/hooks/useAuth';
import { LoginFields } from '@/types';

import styles from './LoginForm.module.css';

const initialValues = {
  phone: '',
  password: '',
};

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(6),
  phone: Yup.string().required('Email is required').min(10).max(10),
});

const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const { query } = useRouter();
  const login = useLogin();

  const ref = query.ref as string;

  const { setToast } = useToast();

  const handleSubmit = async ({ phone, password }: LoginFields) => {
    try {
      setSubmitting(true);
      await login(phone, password);
      setSubmitting(false);
      if (ref) {
        Router.push(`/products/${ref}`);
      } else {
        Router.push('/profile');
      }
    } catch (error) {
      setToast('error', error.message);
      setSubmitting(false);
    }
  };

  return (
    <>
      {submitting && <PageLoader />}
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <Input
              aria-label="Phone"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={values.phone}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.phone && touched.phone)}
            />
            {errors.phone && touched.phone ? (
              <div className={styles.error}>{errors.phone}</div>
            ) : null}
            <Input
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              type="password"
              error={Boolean(errors.password && touched.password)}
              aria-label="Password"
            />
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}

            <div className={styles.bottom}>
              <Button
                type="submit"
                title="Log In"
                disabled={submitting}
                loading={submitting}
                className={styles.button}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
