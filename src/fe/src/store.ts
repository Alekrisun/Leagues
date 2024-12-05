import { configureStore } from '@reduxjs/toolkit';

import userDataReducer, { UserData } from './slice/userSlice';

export type RootState = {
  userState: UserData;
};

const store = configureStore({
  reducer: {
    userState: userDataReducer,
  },
});

export default store;
