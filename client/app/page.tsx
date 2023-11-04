'use client';

import React, { useState, useEffect } from 'react';
import HomeStyles from './styles/Home.module.scss';

import Toolbar from './components/Toolbar';
import EntryTable from './components/EntryTable';
import CategoryChart from './components/CategoryChart';
import MonthlyChart from './components/MonthlyChart';
import YearlyCategoryChart from './components/YearlyCategoryChart';

import axios from 'axios';
import dayjs from 'dayjs';

//Types
import { entryType, modalEntryType } from './utils/interfaces';

//redux functions
import { useSelector } from 'react-redux';

export default function Home() {
  const [data, setData] = useState<entryType[]>();
  const globalStates = useSelector((state) => state);

  async function getEntriesByMonth(adjustedMonth?: number) {
    try {
      const currentMonth = dayjs().month() + 1;
      const currentYear = dayjs().year();
      const monthSelector = adjustedMonth ? adjustedMonth : currentMonth;
      const res = await axios.get(
        `http://localhost:8080/entries/1/${monthSelector}/${currentYear}/getEntriesByMonth`
      );
      setData(res.data);
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      setData([]);
    }
  }

  async function editEntry(editedEntryObj: entryType, selectedMonth: number) {
    const currentYear = dayjs().year();

    try {
      const res = await axios.patch(
        `http://localhost:8080/entries/${editedEntryObj._id}/1/${selectedMonth}/${currentYear}/editEntry`,
        {
          newDescription: editedEntryObj.description,
          newCategory: editedEntryObj.category,
          newDate: editedEntryObj.date,
          newIncome: editedEntryObj.income,
          newDebit: editedEntryObj.debits,
        }
      );
      setData(res.data);
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  }

  async function addEntries(entryArr: modalEntryType[], selectedMonth: number) {
    const currentYear = dayjs().year();

    try {
      const res = await axios.post(
        `http://localhost:8080/entries/1/${selectedMonth}/${currentYear}/addEntry`,
        entryArr
      );
      setData(res.data);
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  }

  async function deleteEntry(entryID: string, selectedMonth: number) {
    const currentYear = dayjs().year();

    try {
      const res = await axios.delete(
        `http://localhost:8080/entries/${entryID}/1/${selectedMonth}/${currentYear}/deleteEntry`
      );
      setData(res.data);
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getEntriesByMonth();
  }, []);

  return (
    <main className={HomeStyles.main}>
      <div className={HomeStyles.main__left}>
        <Toolbar
          getEntriesByMonth={getEntriesByMonth}
          addEntries={addEntries}
        />
        {data && (
          <EntryTable
            data={data}
            editEntry={editEntry}
            deleteEntry={deleteEntry}
          />
        )}
      </div>
      <div className={HomeStyles.main__right}>
        <CategoryChart />
        <MonthlyChart />
        <YearlyCategoryChart />
      </div>
    </main>
  );
}
