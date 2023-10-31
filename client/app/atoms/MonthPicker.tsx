'use client';

import React, { useState, useEffect } from 'react';
import MonthPickerStyles from '../styles/MonthPicker.module.scss';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function MonthPicker() {
  const [inputValue, setInputValue] = useState<number>(1);

  useEffect(() => {
    if (inputValue === 0) {
      setInputValue(1);
    } else if (inputValue === 13) {
      setInputValue(12);
    }
  }, [inputValue]);
  return (
    <div className={MonthPickerStyles.monthPicker}>
      <p>month</p>
      <div className={MonthPickerStyles.monthPicker__inputHolder}>
        <AddIcon
          className={MonthPickerStyles.monthPicker__inputAdd}
          onClick={() => {
            setInputValue(inputValue + 1);
          }}
        ></AddIcon>
        <input
          type="number"
          value={inputValue}
          min={1}
          max={12}
          readOnly
          className={MonthPickerStyles.monthPicker__input}
        ></input>
        <RemoveIcon
          className={MonthPickerStyles.monthPicker__inputRemove}
          onClick={() => {
            setInputValue(inputValue - 1);
          }}
        ></RemoveIcon>
      </div>
    </div>
  );
}
