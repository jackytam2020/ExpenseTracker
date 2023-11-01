import React from 'react';
import EntryRow from '../atoms/EntryRow';
import EntryTableStyles from '../styles/EntryTable.module.scss';

interface entryType {
  date: string;
  description: string;
  category: string;
  income?: number;
  debits?: number;
}

export default function EntryTable({
  modalEntries,
  handleRowDelete,
  entryArr,
  setEntryArr,
}: {
  modalEntries?: entryType[];
  handleRowDelete: (index: number) => void;
  entryArr?: entryType[];
}) {
  const data = [
    {
      date: '2023-10-30',
      description: 'Item 1',
      category: 'Car',
      debits: 50,
    },
    {
      date: '2023-10-30',
      description: 'Item 1',
      category: 'Food',
      debits: 50,
    },
    {
      date: '2023-10-30',
      description: 'Item 1',
      category: 'Income',
      income: 100,
    },
    {
      date: '2023-10-30',
      description: 'Item 1',
      category: 'Food',
      debits: 50,
    },
    // Add more data entries as needed
  ];
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
        {modalEntries
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
          : data.map((entry, index) => (
              <EntryRow key={index} index={index} {...entry} />
            ))}
      </tbody>
    </table>
  );
}
