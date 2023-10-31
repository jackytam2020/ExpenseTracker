import React from 'react';
import EntryRowStyles from '../styles/EntryRow.module.scss';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EntryRow({
  date,
  description,
  category,
  income,
  debits,
}: {
  date: string;
  description: string;
  category: string;
  income: number;
  debits: number;
}) {
  return (
    <tr className={EntryRowStyles.row}>
      <td className={EntryRowStyles.row__data}>{date}</td>
      <td className={EntryRowStyles.row__data}> {description}</td>
      <td className={EntryRowStyles.row__data}>{category}</td>
      <td className={EntryRowStyles.row__data}>{income}</td>
      <td className={EntryRowStyles.row__data}>{debits}</td>
      <td className={EntryRowStyles.row__actionIcons}>
        <ModeEditIcon className={EntryRowStyles.row__editIcon}></ModeEditIcon>
        <DeleteIcon className={EntryRowStyles.row__deleteIcon}></DeleteIcon>
      </td>
    </tr>
  );
}
