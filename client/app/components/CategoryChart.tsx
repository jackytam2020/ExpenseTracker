'use client';
import React from 'react';
import CategoryChartStyles from '../styles/CategoryChart.module.scss';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const labels = [
  'Income',
  'Gas',
  'Car',
  'Utilities',
  'Investments',
  'Entertainment',
  'Food',
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Category Spend',
    },
  },
};

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

export default function CategoryChart() {
  return (
    <div className={CategoryChartStyles.categoryChart}>
      <Bar options={options} data={data} />
    </div>
  );
}
