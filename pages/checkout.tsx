import React from 'react';

import { CheckoutList, CheckoutStripeForm } from '@/components/checkout';
import { Meta } from '@/components/core';
import WithAuth from '@/components/core/WithAuth';
import { ErrorMessage, Container } from '@/components/ui';
import useCart from '@/hooks/cart/useCart';
import styles from '@/styles/Checkout.module.css';
import calculateCartTotal from '@/utils/calculateCartTotal';
import formatPrice from '@/utils/formatPrice';

const Checkout = () => {
  const { data, error } = useCart();
  const cartItems = data ? data.items : [];

  const { cartTotal } = calculateCartTotal(cartItems);

  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Meta title="Check Out" />
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.right}>
            <h2> Confirm Your Order </h2>
            <CheckoutStripeForm />
          </div>
          <div className={styles.left}>
            <h2> Checkout Items </h2>
            <CheckoutList items={cartItems} />
            <div className={styles.paymentTotal}>
              <div className={styles.paymentWrapper}>
                <div className={styles.list}>
                  <div className={styles.label}> Sub Total </div>
                  <div className={styles.item}> {formatPrice(cartTotal)} </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}> Total </div>
                  <div className={`${styles.item} ${styles.total}`}>{formatPrice(cartTotal)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WithAuth(Checkout);
