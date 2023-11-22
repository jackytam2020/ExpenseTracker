'use client';
import React, { useState, useEffect } from 'react';
import CategoryPickerStyles from '../styles/CategoryPicker.module.scss';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function CategoryPicker({
  fromModal,
  handleCategoryChange,
  currentCategory,
}: {
  fromModal?: boolean;
  handleCategoryChange?: (category: string) => void;
  currentCategory?: string;
}) {
  const [category, setCategory] = useState<string>(
    fromModal && currentCategory !== undefined
      ? currentCategory
      : fromModal
      ? 'select a category'
      : 'All'
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState([
    'All',
    'Income',
    'Gas',
    'Car',
    'Utilities',
    'Investments',
    'Entertainment',
    'Food',
  ]);

  useEffect(() => {
    if (fromModal) {
      const filteredCategories = categories.filter((cat) => cat !== 'All');
      setCategories(filteredCategories);
    }
  }, []);

  return (
    <div className={CategoryPickerStyles.categoryPicker}>
      {!fromModal && <p>category</p>}
      <div
        className={
          fromModal
            ? CategoryPickerStyles.categoryPicker__dropDownModal
            : CategoryPickerStyles.categoryPicker__dropDown
        }
      >
        <p>{category}</p>
        <ArrowDropDownIcon
          className={CategoryPickerStyles.categoryPicker__arrowIcon}
          onClick={() => {
            setIsOpen(true);
          }}
        ></ArrowDropDownIcon>
        {isOpen && (
          <div className={CategoryPickerStyles.categoryPicker__dropArea}>
            {categories.map((category, index) => {
              return (
                <p
                  key={index}
                  className={CategoryPickerStyles.categoryPicker__dropAreaItem}
                  onClick={() => {
                    setCategory(category);
                    if (handleCategoryChange) handleCategoryChange(category);
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
