'use client';
import React, { useState, useEffect } from 'react';
import EditModalStyles from '../../styles/EditModal.module.scss';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import CategoryPicker from '@/app/atoms/CategoryPicker';
import DatePick from '@/app/atoms/DatePick';

interface entryType {
  date: Date;
  description: string;
  category: string;
  income?: number;
  debits?: number;
}

export default function EditModal({
  isEditModalOpen,
  setIsEditModalOpen,
  description,
  category,
  income,
  debits,
  date,
  entryArr,
  index,
  setEntryArr,
}: {
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  category: string;
  income?: number;
  debits?: number;
  date: Date;
  entryArr?: entryType[] | undefined;
  index: number;
}) {
  const [entryObj, setEntryObj] = useState<entryType>({
    date: date,
    description: description,
    category: category,
    income: income,
    debits: debits,
  });

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntryObj({ ...entryObj, description: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    setEntryObj({ ...entryObj, category: category });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (entryObj.category === 'Income') {
      setEntryObj({ ...entryObj, income: newValue, debits: 0 });
    } else if (entryObj.category !== 'Income') {
      setEntryObj({ ...entryObj, debits: newValue, income: 0 });
    }
  };

  const handleDateChange = (date: Date) => {
    setEntryObj({ ...entryObj, date: date });
  };

  const submitEntryEdit = () => {
    if (entryArr) {
      setEntryArr((prevEntryArr: entryType[]) => {
        const newArray = [...prevEntryArr];
        newArray[index] = entryObj;
        return newArray;
      });
    }
  };

  return (
    <Modal
      open={isEditModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={EditModalStyles.editModal}>
        <div className={EditModalStyles.editModal__header}>
          <p>Edit entry</p>
          <CloseIcon
            className={EditModalStyles.editModal__closeIcon}
            onClick={() => {
              setIsEditModalOpen(false);
            }}
          ></CloseIcon>
        </div>

        <div className={EditModalStyles.editModal__inputsContainer}>
          <div className={EditModalStyles.editModal__inputRow}>
            <p className={EditModalStyles.editModal__inputsLabel}>
              Description
            </p>
            <input
              type="text"
              value={entryObj.description}
              onChange={handleDescriptionChange}
              className={EditModalStyles.editModal__descInput}
            ></input>
          </div>

          <div className={EditModalStyles.editModal__inputRow}>
            <p className={EditModalStyles.editModal__inputsLabel}>Category</p>
            <CategoryPicker
              fromModal={true}
              currentCategory={entryObj.category}
              handleCategoryChange={handleCategoryChange}
            />
          </div>

          <div className={EditModalStyles.editModal__inputRow}>
            <p className={EditModalStyles.editModal__inputsLabel}>Amount</p>
            <input
              type="number"
              value={entryObj.income ? entryObj.income : entryObj.debits}
              className={EditModalStyles.editModal__amountInput}
              onChange={handleAmountChange}
            ></input>
          </div>

          <div className={EditModalStyles.editModal__inputRow}>
            <p className={EditModalStyles.editModal__inputsLabel}>Date</p>
            <DatePick
              handleDateChange={handleDateChange}
              selectedDate={entryObj.date}
            />
          </div>
        </div>
        <button
          onClick={() => {
            submitEntryEdit();
            setIsEditModalOpen(false);
          }}
        >
          Edit Entry
        </button>
      </div>
    </Modal>
  );
}
