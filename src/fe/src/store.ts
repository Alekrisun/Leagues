import { configureStore } from '@reduxjs/toolkit';

import userDataReducer, { UserData } from './slice/userSlice';
import { leaguesApi } from './slice/apiSlice';

export type RootState = {
  userState: UserData;
};

const store = configureStore({
  reducer: {
    userState: userDataReducer,
    [leaguesApi.reducerPath]: leaguesApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(leaguesApi.middleware);
  },
});

export default store;
