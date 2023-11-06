'use client';
import React, { useState, useEffect } from 'react';
import CategoryChartStyles from '../styles/CategoryChart.module.scss';

import axios from 'axios';
import dayjs from 'dayjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

//redux functions
import { useSelector } from 'react-redux';

//Types
import { entryType, globalType } from '../utils/interfaces';

export default function CategoryChart({ entries }: { entries: entryType[] }) {
  const monthState = useSelector((state: globalType) => state.selectedMonth);
  const [_data, setData] = useState({
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

    try {
      const res = await axios.get(
        `http://localhost:8080/chartData/1/${monthState}/${currentYear}/getCategoryExpenses`
      );

      const dataArr = res.data;
      for (const category in _data) {
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
  }, [monthState, entries]);

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
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: Object.values(_data),
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
    <div
      className={CategoryChartStyles.categoryChart}
      onClick={() => {
        console.log(_data);
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}
