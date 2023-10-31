import React from 'react';
import SearchStyles from '../styles/Search.module.scss';

import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  return (
    <div className={SearchStyles.search}>
      <SearchIcon className={SearchStyles.search__Icon} />
      <input type="text" placeholder="Search..." />
    </div>
  );
}
