import { Formik } from 'formik';
import Router from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { Meta } from '@/components/core';
import { Button, PageLoader, Input } from '@/components/ui';
import { useToast } from '@/contexts';
import { useSignup } from '@/hooks/useAuth';

import styles from './Signup.module.css';

const Schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required').min(6),
  phone: Yup.string().required('Phone number is required'),
});

const SignUp = () => {
  const { setToast } = useToast();
  const signup = useSignup();

  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    password: '',
    name: '',
    phone: '',
  };

  return (
    <>
      <Meta title="Sign Up" />
      {submitting && <PageLoader />}
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={async (values) => {
          try {
            setSubmitting(true);
            await signup(values);
            setSubmitting(false);
            Router.push('/profile');
          } catch (error) {
            setToast('error', error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <Input
              aria-label="Name"
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.name && touched.name)}
            />
            {errors.name && touched.name ? <div className={styles.error}>{errors.name}</div> : null}
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
              aria-label="Password"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              type="password"
              error={Boolean(errors.password && touched.password)}
            />
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}
            <div className={styles.bottom}>
              <Button
                type="submit"
                title="Sign Up"
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

export default SignUp;
