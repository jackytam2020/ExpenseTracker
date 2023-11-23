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
import ReactPaginate from 'react-paginate';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

//Types
import { entryType, modalEntryType, globalType } from '../utils/interfaces';

//redux functions
import { useSelector } from 'react-redux';
import { setUser, setItemsPerPage, setAuthorized } from '../state/global';
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
  const [itemOffset, setItemOffset] = useState(0);
  const router = useRouter();
  const itemsPerPage = useSelector((state: globalType) => state.itemsPerPage);
  const authorized = useSelector((state: globalType) => state.authorized);
  const currentUserID = useSelector((state: globalType) => state.user.googleId);
  const dispatch = useDispatch();

  async function getEntriesByMonth(adjustedMonth?: number | string) {
    if (currentUserID !== undefined) {
      try {
        const currentMonth = dayjs().month() + 1;
        const currentYear = dayjs().year();

        if (adjustedMonth && (adjustedMonth as number) < 10) {
          adjustedMonth = '0' + adjustedMonth.toString();
        }

        const monthSelector = adjustedMonth ? adjustedMonth : currentMonth;
        const res = await axios.get(
          `${process.env.HOST}/entries/${currentUserID}/${monthSelector}/${currentYear}/getEntriesByMonth`
        );
        setData(res.data);
      } catch (error) {
        // Handle the error here
        console.error('Error:', error);
        setData([]);
      }
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
        `${process.env.HOST}/entries/${editedEntryObj._id}/${currentUserID}/${selectedMonth}/${currentYear}/editEntry`,
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
      console.log('Error', error);
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
        `${process.env.HOST}/entries/${currentUserID}/${selectedMonth}/${currentYear}/addEntry`,
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
        `${process.env.HOST}/entries/${entryID}/${currentUserID}/${selectedMonth}/${currentYear}/deleteEntry`
      );
      setData(res.data);
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  }

  async function grabUser() {
    try {
      const res = await axios.get(`http://localhost:8080/auth/profile`, {
        withCredentials: true,
      });
      //if a user object is returned, authorize them to the application and assign the user to the redux object
      dispatch(setAuthorized());
      dispatch(setUser(res.data));
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      //else send them back to the login page
      router.push('/');
    }
  }

  useEffect(() => {
    grabUser();
  }, []);

  useEffect(() => {
    if (currentUserID) {
      getEntriesByMonth();
    }
  }, [currentUserID]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //paginate functions

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data ? data.slice(itemOffset, endOffset) : 0;
  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;

  const handlePageClick = (event: { selected: number }) => {
    if (data) {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      setItemOffset(newOffset);
    }
  };

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
            <div className={HomeStyles.main__pageCount}>
              <p>Show # of Entries:</p>
              <input
                type="number"
                className={HomeStyles.main__pageCountInput}
                value={itemsPerPage}
                onChange={(e) => {
                  dispatch(
                    setItemsPerPage({
                      newCount: parseInt(e.target.value),
                    })
                  );
                }}
              ></input>
            </div>
            <ReactPaginate
              breakLabel="..."
              onPageChange={handlePageClick}
              pageCount={pageCount}
              previousLabel={
                <NavigateBeforeIcon style={{ fontSize: '2rem' }} />
              }
              nextLabel={<NavigateNextIcon style={{ fontSize: '2rem' }} />}
              renderOnZeroPageCount={null}
              disabledClassName={HomeStyles.main__paginateDisabled}
              activeLinkClassName={HomeStyles.main__paginateSelected}
              previousClassName={HomeStyles.main__paginatePrevious}
              nextClassName={HomeStyles.main__paginateNext}
              className={HomeStyles.main__paginate}
              pageLinkClassName={HomeStyles.main__paginateItem}
            />
            <EntryTable
              data={currentItems ? currentItems : []}
              editEntry={editEntry}
              deleteEntry={deleteEntry}
            />
          </div>
        </div>
        {data !== undefined && (
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
