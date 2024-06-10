import { FC } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import styles from './styles.module.scss';

const SortIcon: FC<{ type: 'asc' | 'desc' | boolean }> = ({ type = 'asc' }) => {
  return (
    <div className={styles.container}>
      {type === 'asc' ? (
        <KeyboardArrowUpIcon fontSize="small" />
      ) : type === 'desc' ? (
        <KeyboardArrowDownIcon fontSize="small" />
      ) : (
        <UnfoldMoreIcon fontSize="small" />
      )}
    </div>
  );
};

export default SortIcon;
