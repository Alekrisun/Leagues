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

// export { League, LeaguesResponse };
