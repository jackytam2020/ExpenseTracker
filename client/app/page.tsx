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

import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Chart,
  PointElement,
  LineElement,
} from 'chart.js';

Chart.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  LineElement,
  PointElement
);

export default function Home() {
  const [data, setData] = useState<entryType[]>();
  const globalStates = useSelector((state) => state);

  async function getEntriesByMonth(adjustedMonth?: number | string) {
    try {
      const currentMonth = dayjs().month() + 1;
      const currentYear = dayjs().year();

      if (adjustedMonth && (adjustedMonth as number) < 10) {
        adjustedMonth = '0' + adjustedMonth.toString();
      }

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

  async function editEntry(
    editedEntryObj: entryType,
    selectedMonth: number | string
  ) {
    const currentYear = dayjs().year();

    if ((selectedMonth as number) < 10) {
      selectedMonth = '0' + selectedMonth.toString();
    }

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
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  }

  async function addEntries(
    entryArr: modalEntryType[],
    selectedMonth: number | string
  ) {
    const currentYear = dayjs().year();

    if ((selectedMonth as number) < 10) {
      selectedMonth = '0' + selectedMonth.toString();
    }

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

  async function deleteEntry(entryID: string, selectedMonth: number | string) {
    const currentYear = dayjs().year();

    if ((selectedMonth as number) < 10) {
      selectedMonth = '0' + selectedMonth.toString();
    }

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

  async function grabUser() {
    try {
      const res = await axios.get('http://localhost:8080/auth/profile', {
        withCredentials: true,
      });

      console.log(res.data);
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    grabUser();
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
      {data && (
        <div className={HomeStyles.main__right}>
          <CategoryChart entries={data} />
          <MonthlyChart entries={data} />
          <YearlyCategoryChart entries={data} />
        </div>
      )}
    </main>
  );
}
