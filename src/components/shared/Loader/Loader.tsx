'use client';

import { memo } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader} data-testid="loader-container">
      <Image src="/images/loader.svg" alt="loader" width={50} height={50} />
    </div>
  );
};

export default memo(Loader);
