import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Spinner, ErrorMessage } from '@/components/ui';
import useOrders from '@/hooks/orders/useOrders';
import formatPrice from '@/utils/formatPrice';
import { formatDate } from '@/utils/helpers';

import styles from './OrderList.module.css';

const OrderList = () => {
  const { data, isLoading, error } = useOrders();

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const orders = data || [];

  if (isLoading) {
    return <Spinner size={40} />;
  }

  return (
    <div>
      {orders.length > 0 ? (
        <ul className={styles.ordersContainer}>
          {orders.map((order) => (
            <li key={order._id} className={styles.list}>
              <div>
                <div className={styles.date}>
                  Date Ordered:
                  <span className={styles.dateText}>{formatDate(order.createdAt)}</span>
                </div>
                <div className={styles.date}>
                  {order.downloadUrl && <a href={order.downloadUrl}>Download</a>}
                </div>
                <div className="products">
                  {order.orderItems.map((order) => (
                    <div key={order.product._id} className={styles.productList}>
                      <div className={styles.productWrapper}>
                        <Link href={`/products/${order.product._id}`}>
                          <a>
                            <Image
                              src={order.product.imageURL}
                              alt={order.product.name}
                              width={150}
                              height={150}
                              className={styles.imageFit}
                            />
                          </a>
                        </Link>

                        <div className={styles.productInfo}>
                          <div>
                            <Link href={`/products/${order.product._id}`}>
                              <a>
                                <div className={styles.productName}>{order.product.name}</div>
                              </a>
                            </Link>
                            <div className={styles.productQuantity}>
                              No. of pieces in a set: {order.product.numberOfPieces}
                            </div>
                            <div className={styles.productQuantity}>
                              No. of set(s): {order.quantity}
                            </div>
                          </div>
                          <div className={styles.productPrice}>
                            {formatPrice(
                              order.product.price * order.quantity * order.product.numberOfPieces
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.orderBottom}>
                  <span className={styles.totalText}>Order Status:</span>
                  <span className={styles.totalPrice}>Ordered</span>
                </div>
                <div className={styles.orderBottom}>
                  <span className={styles.totalText}>Order Total:</span>
                  <span className={styles.totalPrice}>{formatPrice(order.total)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.msg}> You have no orders yet.</div>
      )}
    </div>
  );
};

export default OrderList;
