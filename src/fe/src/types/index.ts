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

export type Player = {
  id: string;
  name: string;
  mediaId: string;
};

export type Team = {
  id: string;
  name: string;
  mediaId: string;
  games: number;
  points: number;
  scores: number;
  missed: number;
};

export type LeagueInfo = {
  name: string;
  subName: string;
  description: string;
  mediaId: string;
  teams: Team[];
  events: [];
  gamesToPlay: [];
  bestPlayer: Player;
  bestGoalPlayer: Player;
  bestHelpPlayer: Player;
  news: [];
};

// export { League, LeaguesResponse };
