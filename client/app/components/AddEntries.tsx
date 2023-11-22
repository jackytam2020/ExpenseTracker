'use client';
import React, { useState } from 'react';
import AddEntriesStyles from '../styles/AddEntries.module.scss';

import EntryTable from './EntryTable';

import { motion } from 'framer-motion';
import { useWizard } from 'react-use-wizard';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

interface entryType {
  date: string;
  description: string;
  category: string;
  income?: number;
  debits?: number;
}

export default function AddEntries({
  step,
  setStep,
  entryArr,
  setIsAddModalOpen,
  setEntryArr,
  handleRowDelete,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  entryArr: entryType[];
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEntryArr: React.Dispatch<React.SetStateAction<entryType[]>>;
  handleRowDelete: (index: number) => void;
}) {
  const { nextStep } = useWizard();

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
        <button
          onClick={() => {
            setIsAddModalOpen(false);
            setEntryArr([]);
            setStep(0);
          }}
        >
          Cancel
        </button>
        <button
          disabled={entryArr.length === 0 ? true : false}
        >{`Add (${entryArr.length}) entries`}</button>
      </div>
    </motion.div>
  );
}
