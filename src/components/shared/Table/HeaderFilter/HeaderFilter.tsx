import { FC, useState } from 'react';

import styles from './styles.module.scss';

const HeaderFilter: FC<{ text: string }> = ({ text }) => {
  const [value, setValue] = useState('');
  return (
    <div className={styles.wrapper}>
      <input placeholder={text} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default HeaderFilter;
