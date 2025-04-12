import Router from 'next/router';
import React, { useState } from 'react';

import { PageLoader, Alert, Button } from '@/components/ui';
import { useToast } from '@/contexts';
import useAddOrder from '@/hooks/orders/useAddOrder';

import styles from './CheckoutStripeForm.module.css';

const CheckoutStripeForm = () => {
  const [error, setError] = useState<null | string>(null);
  const [processing, setProcessing] = useState(false);
  const { addOrder } = useAddOrder();
  const { setToast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    try {
      await addOrder('');
      setProcessing(false);
      setError(null);
      Router.push('/orders');
    } catch (error) {
      setToast('error', error.message);
      setProcessing(false);
    }
  };

  return (
    <>
      {processing && <PageLoader />}
      <form onSubmit={handleSubmit}>
        {error && (
          <div className={styles.alertContainer}>
            <Alert message={error} type="error" />
          </div>
        )}
        <Button type="submit" title="Confirm Order" className={styles.button} />
      </form>
    </>
  );
};

export default CheckoutStripeForm;
