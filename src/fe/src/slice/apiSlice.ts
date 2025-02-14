import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LeagueInfo, LeaguesResponse } from '../types';
import { RootState } from '../store';

const url = import.meta.env.VITE_API_URL;

export const leaguesApi = createApi({
  reducerPath: 'leaguesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;

      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getLeaguesTournamentsData: builder.query<LeaguesResponse, void>({
      query: () => 'leagues',
    }),
    getLeagueInfo: builder.query<LeagueInfo, string>({
      query: (id) => `leagues/${id}`,
    }),
    // getTournamentInfo: builder.query<TournamentInfo, string>({
    //   query: (id) => `leagues/${id}`,
    // }),
  }),
});

export const { useGetLeaguesTournamentsDataQuery, useGetLeagueInfoQuery } =
  leaguesApi;
