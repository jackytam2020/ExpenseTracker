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
import { entryType } from './utils/interfaces';

export default function Home() {
  const [data, setData] = useState<entryType[]>();

  async function getEntriesByMonth(adjustedMonth?: number) {
    try {
      const currentMonth = dayjs().month() + 1;
      const currentYear = dayjs().year();
      const monthSelector = adjustedMonth ? adjustedMonth : currentMonth;
      const res = await axios.get(
        `http://localhost:8080/entries/1/${monthSelector}/${currentYear}/getEntriesByMonth`
      );
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      setData([]);
    }
  }

  useEffect(() => {
    getEntriesByMonth();
  }, []);

  return (
    <main className={HomeStyles.main}>
      <div className={HomeStyles.main__left}>
        <Toolbar getEntriesByMonth={getEntriesByMonth} />
        {data && <EntryTable data={data} />}
      </div>
      <div className={HomeStyles.main__right}>
        <CategoryChart />
        <MonthlyChart />
        <YearlyCategoryChart />
      </div>
    </main>
  );
}
