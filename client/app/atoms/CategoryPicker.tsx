'use client';
import React, { useState } from 'react';
import CategoryPickerStyles from '../styles/CategoryPicker.module.scss';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function CategoryPicker() {
  const [category, setCategory] = useState<string>('All');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const categories = [
    'All',
    'Income',
    'Gas',
    'Car',
    'Utilities',
    'Investments',
    'Entertainment',
    'Food',
  ];
  return (
    <div className={CategoryPickerStyles.categoryPicker}>
      <p>category</p>
      <div className={CategoryPickerStyles.categoryPicker__dropDown}>
        <p>{category}</p>
        <ArrowDropDownIcon
          className={CategoryPickerStyles.categoryPicker__arrowIcon}
          onClick={() => {
            setIsOpen(true);
          }}
        ></ArrowDropDownIcon>
        {isOpen && (
          <div className={CategoryPickerStyles.categoryPicker__dropArea}>
            {categories.map((category) => {
              return (
                <p
                  className={CategoryPickerStyles.categoryPicker__dropAreaItem}
                  onClick={() => {
                    setCategory(category);
                    setIsOpen(false);
                  }}
                >
                  {category}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
