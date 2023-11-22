'use client';
import React, { useState, useEffect } from 'react';
import HomeStyles from '../styles/Home.module.scss';

import Toolbar from '../components/Toolbar';
import EntryTable from '../components/EntryTable';
import CategoryChart from '../components/CategoryChart';
import MonthlyChart from '../components/MonthlyChart';
import YearlyCategoryChart from '../components/YearlyCategoryChart';
import ToggleSwitch from '../atoms/ToggleSwitch';

import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

//Types
import { entryType, modalEntryType, globalType } from '../utils/interfaces';

//redux functions
import { useSelector } from 'react-redux';
import { setAuthorized } from '../state/global';
import { useDispatch } from 'react-redux';

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
  const [selectedView, setSelectedView] = useState('entries');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const router = useRouter();
  const globalStates = useSelector((state: globalType) => state);
  const dispatch = useDispatch();

  async function getEntriesByMonth(adjustedMonth?: number | string) {
    try {
      const currentMonth = dayjs().month() + 1;
      const currentYear = dayjs().year();
      const currentUser = globalStates.user.googleId;

      if (adjustedMonth && (adjustedMonth as number) < 10) {
        adjustedMonth = '0' + adjustedMonth.toString();
      }

      const monthSelector = adjustedMonth ? adjustedMonth : currentMonth;
      const res = await axios.get(
        `http://localhost:8080/entries/${currentUser}/${monthSelector}/${currentYear}/getEntriesByMonth`
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
    const currentUser = globalStates.user.googleId;

    if ((selectedMonth as number) < 10) {
      selectedMonth = '0' + selectedMonth.toString();
    }

    try {
      const res = await axios.patch(
        `http://localhost:8080/entries/${editedEntryObj._id}/${currentUser}/${selectedMonth}/${currentYear}/editEntry`,
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

  async function addEntries(
    entryArr: modalEntryType[],
    selectedMonth: number | string
  ) {
    const currentYear = dayjs().year();
    const currentUser = globalStates.user.googleId;

    if ((selectedMonth as number) < 10) {
      selectedMonth = '0' + selectedMonth.toString();
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/entries/${currentUser}/${selectedMonth}/${currentYear}/addEntry`,
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
    const currentUser = globalStates.user.googleId;

    if ((selectedMonth as number) < 10) {
      selectedMonth = '0' + selectedMonth.toString();
    }

    try {
      const res = await axios.delete(
        `http://localhost:8080/entries/${entryID}/${currentUser}/${selectedMonth}/${currentYear}/deleteEntry`
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
      //if a user object is returned, authorize them to the application and assign the user to the redux object
      await dispatch(setAuthorized(res.data));
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      //else send them back to the login page
      router.push('/');
    }
  }

  useEffect(() => {
    grabUser();
    getEntriesByMonth();
  }, [globalStates.user.googleId]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className={HomeStyles.main}>
      {screenWidth < 1279 && <ToggleSwitch setSelectedView={setSelectedView} />}
      <div className={HomeStyles.main__flexedContents}>
        <div
          className={
            selectedView === 'entries'
              ? HomeStyles.main__left
              : HomeStyles.main__leftHidden
          }
        >
          <Toolbar
            getEntriesByMonth={getEntriesByMonth}
            addEntries={addEntries}
          />
          <div className={HomeStyles.main__entryTable}>
            {data && (
              <EntryTable
                data={data}
                editEntry={editEntry}
                deleteEntry={deleteEntry}
              />
            )}
          </div>
        </div>
        {data && (
          <div
            className={
              selectedView === 'charts'
                ? HomeStyles.main__right
                : screenWidth < 1279
                ? HomeStyles.main__rightHidden
                : HomeStyles.main__right
            }
          >
            <CategoryChart entries={data} />
            <MonthlyChart entries={data} />
            <YearlyCategoryChart entries={data} />
          </div>
        )}
      </div>
    </main>
  );
}
