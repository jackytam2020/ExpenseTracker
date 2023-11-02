import axios from 'axios';
import dayjs from 'dayjs';

export async function getEntriesByMonth(adjustedMonth?: number) {
  try {
    const currentMonth = dayjs().month() + 1;
    const currentYear = dayjs().year();
    const monthSelector = adjustedMonth ? adjustedMonth : currentMonth;
    const res = await axios.get(
      `http://localhost:8080/entries/1/${monthSelector}/${currentYear}/getEntriesByMonth`
    );

    console.log(res.data);
    console.log(monthSelector);
    return res.data;
  } catch (error) {
    // Handle the error here
    console.error('Error:', error);
    return [];
  }
}
