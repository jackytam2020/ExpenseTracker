'use client';

import React, { useState, useEffect } from 'react';
import MonthPickerStyles from '../styles/MonthPicker.module.scss';
import dayjs from 'dayjs';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

//redux functions
import { setNewMonth } from '../state/global';
import { useDispatch } from 'react-redux';

export default function MonthPicker({
  getEntriesByMonth,
}: {
  getEntriesByMonth: (inputValue: number) => void;
}) {
  const [inputValue, setInputValue] = useState<number>(dayjs().month() + 1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputValue === 0) {
      setInputValue(1);
    } else if (inputValue === 13) {
      setInputValue(12);
    }
    getEntriesByMonth(inputValue);
    dispatch(
      setNewMonth({
        selectedMonth: inputValue,
      })
    );
  }, [inputValue]);

  return (
    <div className={MonthPickerStyles.monthPicker}>
      <p>month</p>
      <div className={MonthPickerStyles.monthPicker__inputHolder}>
        <RemoveIcon
          className={MonthPickerStyles.monthPicker__inputRemove}
          onClick={() => {
            setInputValue(inputValue - 1);
          }}
        ></RemoveIcon>
        <input
          type="number"
          value={inputValue}
          min={1}
          max={12}
          readOnly
          className={MonthPickerStyles.monthPicker__input}
        ></input>
        <AddIcon
          className={MonthPickerStyles.monthPicker__inputAdd}
          onClick={() => {
            setInputValue(inputValue + 1);
          }}
        ></AddIcon>
      </div>
    </div>
  );
}
