'use client';
import React from 'react';
import YearlyCategoryChartStyles from '../styles/YearlyCategoryChart.module.scss';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
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
      text: 'Yearly Category Spend',
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

export const data = {
  labels,
  datasets: [
    {
      data: [100, 200, 150, 300, 250, 175, 220],
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

export default function YearlyCategoryChart() {
  return (
    <div className={YearlyCategoryChartStyles.yearlyCategoryChart}>
      <div
        className={YearlyCategoryChartStyles.yearlyCategoryChart__yearSelector}
      >
        <p>Year:</p>
        <input type="text" placeholder="2023"></input>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
}
