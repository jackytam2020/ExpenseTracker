'use client';
import React, { useState } from 'react';

import AddModalStyles from '../../styles/AddModal.module.scss';
import { Wizard } from 'react-use-wizard';
import Modal from '@mui/material/Modal';

import AddEntries from '../AddEntries';
import AddEntryRow from '../AddEntryRow';

//Types
import { modalEntryType } from '../../utils/interfaces';

export default function AddModal({
  isAddModalOpen,
  setIsAddModalOpen,
}: {
  isAddModalOpen: boolean;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [step, setStep] = useState<number>(0);
  const [entryArr, setEntryArr] = useState<modalEntryType[]>([]);

  const handleRowDelete = (index: number) => {
    const updatedEntryArr = entryArr.filter((_, i) => i !== index);
    setEntryArr(updatedEntryArr);
  };

  return (
    <div>
      <Modal
        open={isAddModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={AddModalStyles.addModal}>
          <Wizard>
            <AddEntries
              step={step}
              setStep={setStep}
              entryArr={entryArr}
              setEntryArr={setEntryArr}
              setIsAddModalOpen={setIsAddModalOpen}
              handleRowDelete={handleRowDelete}
            />
            <AddEntryRow
              step={step}
              setStep={setStep}
              setEntryArr={setEntryArr}
              entryArr={entryArr}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          </Wizard>
        </div>
      </Modal>
    </div>
  );
}
