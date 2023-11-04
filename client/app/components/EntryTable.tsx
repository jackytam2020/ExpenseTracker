import React from 'react';
import EntryRow from '../atoms/EntryRow';
import EntryTableStyles from '../styles/EntryTable.module.scss';

//types
import { entryType, modalEntryType } from '../utils/interfaces';

export default function EntryTable({
  modalEntries,
  handleRowDelete,
  entryArr,
  setEntryArr,
  data,
  editEntry,
  deleteEntry,
}: {
  modalEntries?: modalEntryType[];
  handleRowDelete?: (index: number) => void;
  entryArr?: modalEntryType[];
  data?: entryType[];
  setEntryArr?: React.Dispatch<React.SetStateAction<modalEntryType[]>>;
  editEntry?: (entryType: entryType, selectedMonth: number) => void;
  deleteEntry?: (entryID: string, selectedMonth: number) => void;
}) {
  return (
    <table className={EntryTableStyles.table}>
      <thead className={EntryTableStyles.table__header}>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Income</th>
          <th>Debits</th>
        </tr>
      </thead>
      <tbody>
        {modalEntries && setEntryArr
          ? modalEntries.map((entry, index) => (
              <EntryRow
                key={index}
                {...entry}
                index={index}
                handleRowDelete={handleRowDelete}
                entryArr={entryArr}
                setEntryArr={setEntryArr}
              />
            ))
          : data &&
            editEntry &&
            data.map((entry, index) => (
              <EntryRow
                key={index}
                index={index}
                {...entry}
                editEntry={editEntry}
                deleteEntry={deleteEntry}
              />
            ))}
      </tbody>
    </table>
  );
}
