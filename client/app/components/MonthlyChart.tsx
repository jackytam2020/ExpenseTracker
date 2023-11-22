'use client';
import React, { useState, useEffect } from 'react';
import MonthlyChartStyles from '../styles/MonthlyChart.module.scss';

import axios from 'axios';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';

//Types
import { entryType } from '../utils/interfaces';

type monthlyData = {
  _id: string;
  totalDebits: number;
};

export default function MonthlyChart({ entries }: { entries: entryType[] }) {
  const [monthlyData, setMonthlyData] = useState(Array(12).fill(0));
  const [selectedYear, setSelectedYear] = useState<number | string>(
    dayjs().year()
  );

  async function getMonthlySpend() {
    try {
      const res = await axios.get(
        `http://localhost:8080/chartData/1/${selectedYear}/getMonthlySpend`
      );
      const dataArr = res.data;

      setMonthlyData((prevData) => {
        // Create a new array based on the previous state
        const newData = [...prevData];

        dataArr.forEach((item: monthlyData) => {
          const monthIndex = parseInt(item._id) - 1; // Subtract 1 because months are 1-based

          if (monthIndex === 0 || monthIndex < 12) {
            newData[monthIndex] = item.totalDebits;
          } else {
            newData[monthIndex - 1] = item.totalDebits;
          }
        });

        return newData;
      });
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    setMonthlyData(Array(12).fill(0));
    getMonthlySpend();
  }, [selectedYear]);

  useEffect(() => {
    getMonthlySpend();
  }, [entries]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Monthly Total Spend for ${selectedYear}`,
      },
      datalabels: {
        display: false,
      },
    },
  };

  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const data = {
    labels,
    datasets: [
      {
        data: monthlyData,
        // data: [299, 0, 0, 0, 0, 0, 0, 0, 200, 571.09, 150],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div
      className={MonthlyChartStyles.monthlyChart}
      onClick={() => {
        console.log(monthlyData);
      }}
    >
      <div className={MonthlyChartStyles.monthlyChart__yearSelector}>
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
      <Line options={options} data={data} />
    </div>
  );
}
