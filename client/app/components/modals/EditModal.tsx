'use client';
import React, { useState, useEffect } from 'react';
import EditModalStyles from '../../styles/EditModal.module.scss';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { create, all } from 'mathjs';

import CategoryPicker from '@/app/atoms/CategoryPicker';
import DatePick from '@/app/atoms/DatePick';

//types
import { entryType, modalEntryType, globalType } from '../../utils/interfaces';

//redux functions
import { useSelector } from 'react-redux';

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
  editEntry,
  entryId,
}: {
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  category: string;
  income?: number;
  debits?: number;
  date: string;
  entryArr?: modalEntryType[] | null;
  index: number;
  setEntryArr: React.Dispatch<React.SetStateAction<modalEntryType[]>> | null;
  editEntry?: (entryObj: entryType, monthState: number) => void;
  entryId?: string;
}) {
  //ensure edit modal has the current values of selected row to be edited
  useEffect(() => {
    setEntryObj({
      _id: entryId,
      description: description,
      date: date,
      category: category,
      income: income,
      debits: debits,
    });
  }, [isEditModalOpen, entryId, date, description, category, income, debits]);

  const [entryObj, setEntryObj] = useState<entryType | modalEntryType>({
    _id: entryId,
    date: date,
    description: description,
    category: category,
    income: income,
    debits: debits,
  });
  const math = create(all);

  const monthState = useSelector((state: globalType) => state.selectedMonth);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntryObj({ ...entryObj, description: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    if (category === 'Income') {
      setEntryObj({
        ...entryObj,
        category: category,
        income: entryObj.debits,
        debits: 0,
      });
    } else {
      setEntryObj({
        ...entryObj,
        category: category,
        debits: entryObj.income,
        income: 0,
      });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    try {
      const evaluatedResult = math.evaluate(input);

      if (entryObj.category === 'Income') {
        setEntryObj({ ...entryObj, income: evaluatedResult, debits: 0 });
      } else {
        setEntryObj({ ...entryObj, debits: evaluatedResult, income: 0 });
      }
    } catch {
      console.log('Invalid expression');
    }
  };

  const handleDateChange = (date: string) => {
    setEntryObj({ ...entryObj, date: date });
  };

  const submitEntryEdit = () => {
    if (entryArr && setEntryArr) {
      setEntryArr((prevEntryArr: modalEntryType[]) => {
        const newArray = [...prevEntryArr];
        newArray[index] = entryObj;
        return newArray;
      });
    }

    //invoke edit entry endpoint when editing from homepage
    if (editEntry) {
      editEntry(entryObj as entryType, monthState);
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
              type="text"
              defaultValue={entryObj.income ? entryObj.income : entryObj.debits}
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
        <div className={EditModalStyles.editModal__actionButton}>
          <button
            onClick={() => {
              submitEntryEdit();
              setIsEditModalOpen(false);
            }}
          >
            Edit Entry
          </button>
        </div>
      </div>
    </Modal>
  );
}
