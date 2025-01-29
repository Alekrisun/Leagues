import { LeaguesResponse } from '../types';
const url = import.meta.env.VITE_API_URL;

export const loadLeaguesData = async (instance: string) => {
  const response = await fetch(`${url}/api/${instance}`);
  if (!response.ok) {
    throw new Error(
      `Unable to fetch data. Response status: ${response.status}`
    );
  }
  const data: LeaguesResponse = await response.json();
  return data;
};
