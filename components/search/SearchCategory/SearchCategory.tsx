import React, { useEffect, useState } from 'react';

import CategoryService from '@/services/CategoryService';
import { Category } from '@/types';

import styles from './SearchCategory.module.css';

interface Props {
  active: string;
  onChangeTab(active: string): void;
}

const SearchCategory = ({ active, onChangeTab }: Props) => {
  const [categories, setCategories] = useState<Category[]>();
  useEffect(() => {
    async function getCats() {
      const cats = await CategoryService.getCategories();

      setCategories(cats);
    }

    getCats();
  }, []);
  return (
    <>
      <div className={styles.tab}>
        {categories &&
          categories.map((category) => (
            <button
              key={category._id}
              type="button"
              className={`${styles.list} ${
                active === category.name.toLowerCase() ? styles.active : ''
              }`}
              onClick={() => onChangeTab(category.name.toLowerCase())}
            >
              {category.name}
            </button>
          ))}
      </div>
    </>
  );
};

export default SearchCategory;
