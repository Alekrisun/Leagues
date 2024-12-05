export type League = {
  id: string;
  type: number;
  mediaId: string;
  name: string;
  description: string;
};

export type Tournament = {
  id: string;
  type: number;
  mediaId: string;
  name: string;
  description: string;
};

export type LeaguesResponse = {
  leagues: League[];
  tournaments: Tournament[];
};

export enum ResponseEnum {
  LEAGUES = 'leagues',
  TOURNAMENTS = 'tournaments',
}

export type ResponseUser = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  token: string;
  message?: string;
};

// export { League, LeaguesResponse };
