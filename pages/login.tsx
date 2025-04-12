import Link from 'next/link';

import { LoginForm } from '@/components/auth';
import { Meta } from '@/components/core';
import { Heading } from '@/components/ui';
import styles from '@/styles/Auth.module.css';

const Login = () => {
  return (
    <>
      <Meta title="Log In" />
      <div className={styles.authContainer}>
        <Heading>Log In</Heading>
        <LoginForm />
        <div className={styles.link}>
          Don{`'`}t have an account?
          <Link href="/signup">
            <a className={`${styles.link} ${styles.linkText}`}> Create an account.</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
