'use client';
import React, { useState } from 'react';
import EntryRowStyles from '../styles/EntryRow.module.scss';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import EditModal from '../components/modals/EditModal';
import DeleteModal from '../components/modals/DeleteModal';

//types
import { entryType, modalEntryType } from '../utils/interfaces';

export default function EntryRow({
  _id,
  date,
  description,
  category,
  income,
  debits,
  handleRowDelete,
  index,
  entryArr,
  setEntryArr,
  editEntry,
  deleteEntry,
}: {
  _id?: string;
  index: number;
  date: string;
  description: string;
  category: string;
  income?: number;
  debits?: number;
  handleRowDelete?: (index: number) => void;
  entryArr?: modalEntryType[] | undefined;
  setEntryArr?: React.Dispatch<React.SetStateAction<modalEntryType[]>>;
  editEntry?: (entryType: entryType, selectedMonth: number) => void;
  deleteEntry?: (entryID: string, selectedMonth: number) => void;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  return (
    <tr className={EntryRowStyles.row}>
      <td className={EntryRowStyles.row__data}>{date}</td>
      <td className={EntryRowStyles.row__data}> {description}</td>
      <td className={EntryRowStyles.row__data}>{category}</td>
      <td className={EntryRowStyles.row__data}>
        {income !== 0 && income !== undefined && `$${income}`}
      </td>
      <td className={EntryRowStyles.row__data}>
        {debits !== 0 && debits !== undefined && `$${debits}`}
      </td>
      <td className={EntryRowStyles.row__actionIcons}>
        <ModeEditIcon
          className={EntryRowStyles.row__editIcon}
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        ></ModeEditIcon>
        <DeleteIcon
          className={EntryRowStyles.row__deleteIcon}
          onClick={() => {
            if (handleRowDelete) handleRowDelete(index);
            else {
              setIsDeleteModalOpen(true);
            }
          }}
        ></DeleteIcon>
      </td>
      <EditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        entryId={_id}
        description={description}
        category={category}
        income={income}
        debits={debits}
        date={date}
        index={index}
        entryArr={entryArr ? entryArr : null}
        setEntryArr={setEntryArr ? setEntryArr : null}
        editEntry={editEntry}
      />
      {deleteEntry && _id && (
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          date={date}
          entryId={_id}
          income={income}
          debits={debits}
          description={description}
          deleteEntry={deleteEntry}
        />
      )}
    </tr>
  );
}
