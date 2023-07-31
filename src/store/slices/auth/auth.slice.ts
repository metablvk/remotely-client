import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: window.localStorage.getItem('userInfo')
    ? JSON.parse(window.localStorage.getItem('userInfo') || '{}')
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      window.localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: state => {
      state.userInfo = null;
      window.localStorage.removeItem('userInfo');
    },
  },
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;
