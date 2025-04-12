import React from 'react';

import { ProductList } from '@/components/product';
import { Spinner, Button, Heading } from '@/components/ui';
import useSearchProducts from '@/hooks/useSearchProducts';
import { Product } from '@/types';
import { colors } from '@/utils/theme';

import styles from './ProductOverviewSection.module.css';

interface Props {
  initialProducts: Product[];
  searchParams: Record<string, any> | undefined;
}

const ProductOverviewSearchSection = ({ initialProducts, searchParams }: Props) => {
  const { products, loadMore, isLoadingMore, isReachingEnd } = useSearchProducts(
    initialProducts,
    searchParams
  );

  const showLoadMore = !isLoadingMore && !isReachingEnd;

  return (
    <div className={styles.container}>
      <Heading>Product Overview</Heading>

      <ProductList products={products} />

      {isLoadingMore && (
        <div className={styles.loadingWrapper}>
          <Spinner color={colors.primary} size={30} />
        </div>
      )}

      {showLoadMore && (
        <div className={styles.loadMore}>
          <Button
            title="Load More"
            className={styles.loadMoreBtn}
            onClick={() => loadMore()}
            type="button"
            variant="outline"
          />
        </div>
      )}

      {isReachingEnd && (
        <div className={styles.reachedEnd}>No more products. You have reached the end.</div>
      )}
    </div>
  );
};

export default ProductOverviewSearchSection;
