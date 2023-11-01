'use client';
import react, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { UrlWithStringQuery } from 'url';

export default function DatePick({
  handleDateChange,
  selectedDate,
}: {
  handleDateChange: (date: UrlWithStringQuery) => void;
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
            const formattedDate = dayjs(newValue as Date).format('YYYY/MM/DD');
            handleDateChange(formattedDate);
          }
        }}
      />
    </LocalizationProvider>
  );
}
