'use client';
import React, { useState } from 'react';
import EntryRowStyles from '../styles/EntryRow.module.scss';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import EditModal from '../components/modals/EditModal';

//types
import { entryType, modalEntryType } from '../utils/interfaces';

export default function EntryRow({
  date,
  description,
  category,
  income,
  debits,
  handleRowDelete,
  index,
  entryArr,
  setEntryArr,
}: {
  index: number;
  date: string;
  description: string;
  category: string;
  income?: number;
  debits?: number;
  handleRowDelete?: (index: number) => void;
  entryArr?: modalEntryType[] | undefined;
  setEntryArr?: React.Dispatch<React.SetStateAction<modalEntryType[]>>;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
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
          }}
        ></DeleteIcon>
      </td>
      <EditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        description={description}
        category={category}
        income={income}
        debits={debits}
        date={date}
        index={index}
        entryArr={entryArr ? entryArr : null}
        setEntryArr={setEntryArr ? setEntryArr : null}
      />
    </tr>
  );
}
