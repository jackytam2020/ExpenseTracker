'use client';
import React, { useState } from 'react';

import MonthPicker from '../atoms/MonthPicker';
import CategoryPicker from '../atoms/CategoryPicker';
import Search from '../atoms/Search';
import AddModal from './modals/AddModal';

import ToolbarStyles from '../styles/Toolbar.module.scss';
import AddIcon from '@mui/icons-material/Add';

export default function Toolbar() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <div className={ToolbarStyles.toolbar}>
      <div className={ToolbarStyles.toolbar__item}>
        <AddIcon
          className={ToolbarStyles.toolbar__addIcon}
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        ></AddIcon>
      </div>
      <div className={ToolbarStyles.toolbar__item}>
        <MonthPicker />
      </div>
      <div className={ToolbarStyles.toolbar__item}>
        <CategoryPicker />
      </div>
      <div className={ToolbarStyles.toolbar__item}>
        <Search />
      </div>
      <AddModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </div>
  );
}
