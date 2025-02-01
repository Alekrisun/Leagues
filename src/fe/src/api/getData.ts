import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { LeagueInfo, LeaguesResponse } from '../types';
import { selectUserData } from '../slice/userSlice';
const url = import.meta.env.VITE_API_URL;

export const loadData = async (instance: string) => {
  // const response = await fetch(`${url}/api/${instance}`);
  const response = await fetch(`${url}/api/leagues`);
  if (!response.ok) {
    throw new Error(
      `Unable to fetch data. Response status: ${response.status}`
    );
  }
  const data: LeaguesResponse = await response.json();
  return data;
};

export const getLeagueInfo = async (id: string) => {
  const jwt = Cookies.get('jwt');
  let response;

  if (jwt) {
    response = await fetch(`${url}/api/leagues/${id}/info`, {
      headers: {
        Authorization: jwt,
      },
    });
  } else {
    response = await fetch(`${url}/api/leagues/${id}/info`);
  }

  if (!response.ok) {
    throw new Error(
      `Unable to fetch data. Response status: ${response.status}`
    );
  }
  const data: LeagueInfo = await response.json();

  return data;
};
