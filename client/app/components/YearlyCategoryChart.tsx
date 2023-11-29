'use client';
import React, { useState, useEffect } from 'react';
import YearlyCategoryChartStyles from '../styles/YearlyCategoryChart.module.scss';

import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import dayjs from 'dayjs';

//Types
import { entryType, globalType } from '../utils/interfaces';

//redux functions
import { useSelector } from 'react-redux';

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

export default function YearlyCategoryChart({
  entries,
}: {
  entries: entryType[];
}) {
  const [data, setData] = useState<categoryType>({
    Income: 0,
    Gas: 0,
    Car: 0,
    Utilities: 0,
    Investments: 0,
    Entertainment: 0,
    Food: 0,
  });
  const [selectedYear, setSelectedYear] = useState<number | string>(
    dayjs().year()
  );
  const currentUserID = useSelector((state: globalType) => state.user.googleId);

  async function getYearlyCategorySpend() {
    try {
      const res = await axios.get(
        `${process.env.HOST}/chartData/${currentUserID}/${selectedYear}/getYearlyCategorySpend`
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
    setData({
      Income: 0,
      Gas: 0,
      Car: 0,
      Utilities: 0,
      Investments: 0,
      Entertainment: 0,
      Food: 0,
    });
    getYearlyCategorySpend();
  }, [selectedYear]);

  useEffect(() => {
    getYearlyCategorySpend();
  }, [entries]);

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: `Yearly Category Spend for ${selectedYear}`,
      },
      datalabels: {
        formatter: function (value: number) {
          return value.toFixed(2);
        },
      },
    },
  };

  const labels = [
    'Income',
    'Gas',
    'Car',
    'Utilities',
    'Investments',
    'Entertainment',
    'Food',
  ];

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
  return (
    <div className={YearlyCategoryChartStyles.yearlyCategoryChart}>
      <div
        className={YearlyCategoryChartStyles.yearlyCategoryChart__yearSelector}
      >
        <p>Year:</p>
        <input
          type="text"
          placeholder="2023"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
          }}
        ></input>
      </div>
      <Bar options={options} data={expenses} />
    </div>
  );
}
