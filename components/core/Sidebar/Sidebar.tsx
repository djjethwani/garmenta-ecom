import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui';
import { useLogout } from '@/hooks/useAuth';
import useUser from '@/hooks/user/useUser';
import CategoryService from '@/services/CategoryService';
import { Category } from '@/types';

import styles from './Sidebar.module.css';

interface Props {
  isOpen: boolean;
  onClose(): void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {
  const { data: currentUser } = useUser();
  const logout = useLogout();
  const [categories, setCategories] = useState<Category[]>();
  useEffect(() => {
    async function getCats() {
      const cats: Category[] = await CategoryService.getCategories();

      setCategories(cats);
    }

    getCats();
  }, []);
  const handleClose = () => {
    onClose();
  };

  const handleLogOut = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.isOpen : ''}`}>
        <div
          className={styles.list}
          role="link"
          tabIndex={-1}
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <Link href="/">
            <a className={styles.link}>Home</a>
          </Link>
        </div>
        <div className={styles.title}>
          <span> Categories </span>
        </div>
        {categories &&
          categories.map((category, index) => (
            <div
              key={index}
              className={styles.list}
              role="link"
              tabIndex={-1}
              onClick={handleClose}
              onKeyDown={handleClose}
            >
              <Link href={`/search?category=${category.name.toLowerCase()}`}>
                <a className={styles.link}>{category.name}</a>
              </Link>
            </div>
          ))}

        {currentUser && (
          <>
            <div className={styles.title}>
              <span> Account </span>
            </div>
            <div
              className={styles.list}
              role="link"
              tabIndex={-1}
              onClick={handleClose}
              onKeyDown={handleClose}
            >
              <Link href="/orders">
                <a className={styles.link}>My Orders</a>
              </Link>
            </div>
            <div
              className={styles.list}
              role="link"
              tabIndex={-1}
              onClick={handleClose}
              onKeyDown={handleClose}
            >
              <Link href="/wishlist">
                <a className={styles.link}>My Wishlist</a>
              </Link>
            </div>
            <div className={styles.list}>
              <Button
                type="button"
                onClick={handleLogOut}
                title="Log Out"
                style={{ width: '100%' }}
              />
            </div>
          </>
        )}
      </div>

      {isOpen && (
        <div
          className={styles.overlay}
          role="button"
          tabIndex={-1}
          onClick={onClose}
          onKeyDown={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
