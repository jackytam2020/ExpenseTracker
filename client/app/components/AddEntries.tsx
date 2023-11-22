'use client';
import React, { useState } from 'react';
import AddEntriesStyles from '../styles/AddEntries.module.scss';

import EntryTable from './EntryTable';
import Button from '../atoms/Button';

import { motion } from 'framer-motion';
import { useWizard } from 'react-use-wizard';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

//Types
import { modalEntryType, globalType } from '../utils/interfaces';

//redux functions
import { useSelector } from 'react-redux';

export default function AddEntries({
  step,
  setStep,
  entryArr,
  setIsAddModalOpen,
  setEntryArr,
  handleRowDelete,
  addEntries,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  entryArr: modalEntryType[];
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEntryArr: React.Dispatch<React.SetStateAction<modalEntryType[]>>;
  handleRowDelete: (index: number) => void;
  addEntries: (entryArr: modalEntryType[], monthState: number) => void;
}) {
  const { nextStep } = useWizard();
  const monthState = useSelector((state: globalType) => state.selectedMonth);

  const handleCancel = () => {
    setIsAddModalOpen(false);
    setEntryArr([]);
    setStep(0);
  };

  const handleConfirm = () => {
    addEntries(entryArr, monthState);
    setEntryArr([]);
    setIsAddModalOpen(false);
  };

  return (
    <motion.div
      initial={step === 0 ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      className={AddEntriesStyles.addEntries}
    >
      <div className={AddEntriesStyles.addEntries__header}>
        <p>Add entries</p>
        <CloseIcon
          className={AddEntriesStyles.addEntries__closeIcon}
          onClick={() => {
            setIsAddModalOpen(false);
            setEntryArr([]);
            setStep(0);
          }}
        ></CloseIcon>
      </div>
      <div className={AddEntriesStyles.addEntries__table}>
        <EntryTable
          modalEntries={entryArr}
          handleRowDelete={handleRowDelete}
          entryArr={entryArr}
          setEntryArr={setEntryArr}
        />
      </div>

      <div
        className={AddEntriesStyles.addEntries__addContainer}
        onClick={() => {
          nextStep();
          setStep(2);
        }}
      >
        <div className={AddEntriesStyles.addEntries__AddButton}>
          <AddIcon className={AddEntriesStyles.addEntries__AddIcon}></AddIcon>
        </div>
        <p>Add a new entry</p>
      </div>

      <div className={AddEntriesStyles.addEntries__actionButtons}>
        <Button onClick={handleCancel} type={'Cancel'} text={'Cancel'} />

        <Button
          disabled={entryArr.length === 0 ? true : false}
          onClick={handleConfirm}
          type={entryArr.length === 0 ? 'Disabled' : 'Confirm'}
          text={`Add (${entryArr.length}) entries`}
        />
      </div>
    </motion.div>
  );
}
