'use client';
import react, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function DatePick({
  handleDateChange,
  selectedDate,
}: {
  handleDateChange: (date: string) => void;
  selectedDate?: string;
}) {
  const [currentDate, setCurrentDate] = useState(
    selectedDate ? selectedDate : dayjs().format('YYYY-MM-DD')
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjs(currentDate)}
        onChange={(newValue) => {
          if (newValue) {
            const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
            handleDateChange(formattedDate);
          }
        }}
      />
    </LocalizationProvider>
  );
}
