'use client';

import Image from 'next/image';

import styles from './styles.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image src="/images/loader.svg" alt="loader" width={50} height={50} />
    </div>
  );
};

export default Loader;
