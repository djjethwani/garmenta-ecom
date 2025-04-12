import Link from 'next/link';

import { SignUpForm } from '@/components/auth';
import { Meta } from '@/components/core';
import { Heading } from '@/components/ui';
import styles from '@/styles/Auth.module.css';

const SignUp = () => {
  return (
    <>
      <Meta title="Sign Up" />
      <div className={styles.authContainer}>
        <Heading>Sign Up</Heading>
        <SignUpForm />
        {/* <div className={styles.link}>Want to source for your business ?</div>
        <div className={styles.link}>
          <a
            href="https://api.whatsapp.com/send?phone=&text=Hi, Please help us with your good name:"
            rel="noreferrer"
            target="_blank"
          >
            <Button type="submit" title="Click Here to create account" className={styles.button} />
          </a>
        </div> */}
        <div className={styles.link}>
          Already have an account?
          <Link href="/login">
            <a className={`${styles.link} ${styles.linkText}`}> Log in your account.</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
