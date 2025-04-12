import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { WishlistButton } from '@/components/wishlist';
import useUser from '@/hooks/user/useUser';
import { Product } from '@/types';
import formatPrice from '@/utils/formatPrice';

import styles from './ProductCard.module.css';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { data: currentUser } = useUser();
  const logUrl = `/login?ref=${product._id}`;
  // const routeToLogin = () => {
  //   return Router.push(`/login?ref=${product._id}`);
  // };

  return (
    <div>
      <Link href={`/products/${product._id}`}>
        <a>
          <div>
            <div className={styles.productImgWrapper}>
              <Image src={product.imageURL} alt={product.name} width={500} height={500} />
              <div className={styles.wishlistButtonContainer}>
                <WishlistButton productId={product._id} />
              </div>
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productName}>Size: {product.size}</div>
              <div className={styles.productName}>Cloth: {product.cloth}</div>
              {currentUser && (
                <div className={styles.productPrice}>{formatPrice(product.price)}</div>
              )}
            </div>
          </div>
        </a>
      </Link>
      {!currentUser && (
        <div className={styles.productInfo}>
          <a href={logUrl}>
            <div className={styles.productName} style={{ textDecoration: 'underline' }}>
              Login To View Price
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
