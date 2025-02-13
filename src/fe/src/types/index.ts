export type League = {
  id: string;
  type: number;
  mediaId: string;
  name: string;
  description: string;
};

export type LeaguesResponse = {
  items: League[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
};

export enum ResponseEnum {
  LEAGUES = 1,
  TOURNAMENTS = 2,
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
  events: Record<string, EventLeagueInfo>;
  games: Record<string, GameLeagueInfo>;
  teams: Record<string, TeamLeagueInfo>;
  gamesToPlay: [];
  bestPlayer: Player;
  bestGoalPlayer: Player;
  bestHelpPlayer: Player;
  news: [];
};

export type TeamLeagueInfo = {
  name: string;
};

export type GameLeagueInfo = {
  eventId: string;
  homeTeamId: string;
  homeTeamScore: number;
  guestTeamId: string;
  guestTeamScore: number;
};

export type EventLeagueInfo = {
  name: string;
  games: GameEventLeagueInfo[]

};

export type GameEventLeagueInfo = {
  id: number;
  homeTeamId: string;
  guestTeamId: string;
};

// export { League, LeaguesResponse };
