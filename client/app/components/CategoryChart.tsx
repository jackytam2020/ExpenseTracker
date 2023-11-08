'use client';
import React, { useState, useEffect } from 'react';
import CategoryChartStyles from '../styles/CategoryChart.module.scss';

import axios from 'axios';
import dayjs from 'dayjs';

import { Bar } from 'react-chartjs-2';

//redux functions
import { useSelector } from 'react-redux';

//Types
import { entryType, globalType } from '../utils/interfaces';

type categoryType = {
  [key: string]: number;
  Income: number;
  Gas: number;
  Car: number;
  Utilities: number;
  Investments: number;
  Entertainment: number;
  Food: number;
};

export default function CategoryChart({ entries }: { entries: entryType[] }) {
  const monthState = useSelector((state: globalType) => state.selectedMonth);
  const [data, setData] = useState<categoryType>({
    Income: 0,
    Gas: 0,
    Car: 0,
    Utilities: 0,
    Investments: 0,
    Entertainment: 0,
    Food: 0,
  });

  async function getCategoryExpenses() {
    const currentYear = dayjs().year();

    let selectedMonth: number | string = monthState;

    if (monthState < 10) {
      selectedMonth = '0' + monthState.toString();
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/chartData/1/${selectedMonth}/${currentYear}/getCategoryExpenses`
      );

      const dataArr = res.data;
      for (const category in data) {
        for (let i = 0; i < dataArr.length; i++) {
          if (dataArr[i]._id === category) {
            setData((prevData) => ({
              ...prevData,
              [category]: dataArr[i].totalAmount,
            }));
          }
        }
      }
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getCategoryExpenses();
    calculateTotalSpend();
  }, [monthState, entries]);

  useEffect(() => {
    //revert datasets to initial before calling the api every time the month changes
    setData({
      Income: 0,
      Gas: 0,
      Car: 0,
      Utilities: 0,
      Investments: 0,
      Entertainment: 0,
      Food: 0,
    });
    getCategoryExpenses();
  }, [monthState]);

  const labels = [
    'Income',
    'Gas',
    'Car',
    'Utilities',
    'Investments',
    'Entertainment',
    'Food',
  ];

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Category Spend',
      },
      datalabels: {
        color: 'black',
        formatter: function (value: number) {
          return value.toFixed(2);
        },
      },
    },
  };

  const expenses = {
    labels,
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(205, 133, 0, 0.5)',
        ],
      },
    ],
  };

  const calculateTotalSpend = () => {
    const result = Object.keys(data)
      .filter((key) => key !== 'Income')
      .reduce((total, category) => (total += data[category]), 0)
      .toFixed(2);
    return result;
  };

  return (
    <div className={CategoryChartStyles.categoryChart}>
      <Bar options={options} data={expenses} />
      <h3>{`Total Expenditure for this Month: $${calculateTotalSpend()}`}</h3>
    </div>
  );
}
