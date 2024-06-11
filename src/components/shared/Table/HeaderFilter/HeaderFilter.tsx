import { FC, useEffect, useState } from 'react';

import IProps from './types';

import styles from './styles.module.scss';

const HeaderFilter: FC<IProps> = ({ title, tableColumnFilters, setColumnFilters, id }) => {
  const [value, setValue] = useState(
    String(tableColumnFilters?.find((item) => item.id === id)?.value || '')
  );

  useEffect(() => {
    setColumnFilters({ id, value });
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <input placeholder={title} value={value} onChange={(e) => setValue(e.target.value)} />
      {!!value && <button onClick={() => setValue('')}>×</button>}
    </div>
  );
};

export default HeaderFilter;
