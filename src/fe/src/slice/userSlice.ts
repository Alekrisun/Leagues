import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type UserData = {
  isLoggedIn: boolean;
  token: string;
  // userId: string;
};

type ActionType = {
  token: string;
  // userId: string;
};

const initialState: UserData = {
  isLoggedIn: false,
  token: '',
  // userId: '',
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    LoginUser: (state, action: PayloadAction<ActionType>) => {
      // state.isAdmin = action.payload.isAdmin;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      // state.userId = action.payload.userId;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = '';
      // state.userId = '';
    },
  },
});

export const selectUserData = (state: RootState) => state.userState;
export const { LoginUser, logoutUser } = userDataSlice.actions;
export default userDataSlice.reducer;
