import React from 'react';
import DeleteModalStyles from '../../styles/DeleteModal.module.scss';

import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import Button from '@/app/atoms/Button';

//redux functions
import { useSelector } from 'react-redux';

//types
import { globalType } from '../../utils/interfaces';

export default function DeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  date,
  income,
  debits,
  description,
  deleteEntry,
  entryId,
}: {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entryId: string;
  date: string;
  income?: number;
  debits?: number;
  description: string;
  deleteEntry: (entryID: string, selectedMonth: number) => void;
}) {
  const monthState = useSelector((state: globalType) => state.selectedMonth);

  const handleCancel = () => {
    {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    deleteEntry(entryId, monthState);
  };
  return (
    <Modal
      open={isDeleteModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={DeleteModalStyles.deleteModal}>
        <div className={DeleteModalStyles.deleteModal__header}>
          <p>Delete an entry</p>
          <CloseIcon
            className={DeleteModalStyles.deleteModal__closeIcon}
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
          ></CloseIcon>
        </div>

        <div className={DeleteModalStyles.deleteModal__contents}>
          <p className={DeleteModalStyles.deleteModal__warning}>
            Are you sure you want to delete the following entry:
          </p>
          <p
            className={DeleteModalStyles.deleteModal__entry}
          >{`${description} $${income ? income : debits} on ${date}`}</p>
        </div>

        <div className={DeleteModalStyles.deleteModal__actionButtons}>
          <Button text={'Cancel'} type={'Cancel'} onClick={handleCancel} />
          <Button
            text={'Delete Entry'}
            type={'Delete'}
            onClick={handleDelete}
          />
        </div>
      </div>
    </Modal>
  );
}
