import { FC, memo } from 'react';

import styles from './styles.module.scss';

const NoResults: FC<{ text?: string }> = ({ text = 'No Results' }) => {
  return <div className={styles.text}>{text}</div>;
};

export default memo(NoResults);
