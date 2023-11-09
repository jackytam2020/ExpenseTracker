import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  selectedMonth: dayjs().month() + 1,
  selectedYear: dayjs().year(),
  authorized: false,
  user: {},
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setNewMonth: (state, action) => {
      state.selectedMonth = action.payload.selectedMonth;
    },
    setAuthorized: (state, action) => {
      state.authorized = state.authorized === true;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.authorized = state.authorized === false;
      state.user = {};
    },
  },
});

export const { setNewMonth, setAuthorized, setLogout } = globalSlice.actions;

export default globalSlice.reducer;
