import React from 'react';
import { FaInstagram } from 'react-icons/fa';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© 2024 Garmenta. All rights reserved.</p>
        <ul className={styles.links}>
          <li>
            <a
              href="https://www.instagram.com/garmenta.in?igsh=MTZyM25pb203eDZxeA=="
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={22} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
