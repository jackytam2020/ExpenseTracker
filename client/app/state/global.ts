import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  selectedMonth: dayjs().month() + 1,
  selectedYear: dayjs().year(),
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setNewMonth: (state, action) => {
      state.selectedMonth = action.payload.selectedMonth;
    },
  },
});

export const { setNewMonth } = globalSlice.actions;

export default globalSlice.reducer;
