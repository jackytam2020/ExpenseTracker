import React from 'react';
import EntryRow from '../atoms/EntryRow';
import EntryTableStyles from '../styles/EntryTable.module.scss';

export default function EntryTable() {
  const data = [
    {
      date: '2023-10-30',
      description: 'Item 1',
      category: 'Category A',
      income: 100,
      debits: 50,
    },
    {
      date: '2023-10-30',
      description: 'Item 1',
      category: 'Category A',
      income: 100,
      debits: 50,
    },
    {
      date: '2023-10-30',
      description: 'Item 1',
      category: 'Category A',
      income: 100,
      debits: 50,
    },
    {
      date: '2023-10-30',
      description: 'Item 1',
      category: 'Category A',
      income: 100,
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
        {data.map((entry, index) => (
          <EntryRow key={index} {...entry} />
        ))}
      </tbody>
    </table>
  );
}
