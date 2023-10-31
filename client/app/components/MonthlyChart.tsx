'use client';
import React from 'react';
import MonthlyChartStyles from '../styles/MonthlyChart.module.scss';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Monthly Total Spend',
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
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const data = {
  labels,
  datasets: [
    {
      data: [
        1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000,
      ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function MonthlyChart() {
  return (
    <div className={MonthlyChartStyles.monthlyChart}>
      <div className={MonthlyChartStyles.monthlyChart__yearSelector}>
        <p>Year:</p>
        <input type="text" placeholder="2023"></input>
      </div>
      <Line options={options} data={data} />
    </div>
  );
}
