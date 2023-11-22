import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  selectedMonth: dayjs().month() + 1,
  selectedYear: dayjs().year(),
  authorized: false,
  user: {},
  itemsPerPage: 15,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setNewMonth: (state, action) => {
      state.selectedMonth = action.payload.selectedMonth;
    },
    setAuthorized: (state) => {
      state.authorized = state.authorized = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.authorized = state.authorized = false;
      state.user = {};
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload.newCount;
    },
  },
});

export const {
  setNewMonth,
  setUser,
  setAuthorized,
  setLogout,
  setItemsPerPage,
} = globalSlice.actions;

export default globalSlice.reducer;
