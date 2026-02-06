'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './not-found.module.css';

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', pathname);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! Page not found</p>
        <Link href="/" className={styles.link}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}

