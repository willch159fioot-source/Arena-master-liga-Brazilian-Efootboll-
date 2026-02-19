
export type PaymentStatus = 'paid' | 'pending';
export type UserRole = 'admin' | 'player';

export interface User {
  id: string;
  fullName: string;
  email: string;
  teamName: string;
  role: UserRole;
  paymentStatus: PaymentStatus;
  stats: UserStats;
}

export interface UserStats {
  points: number;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'scheduled' | 'finished';
  tournamentId: string;
  date: string;
}

export interface Tournament {
  id: string;
  name: string;
  type: string;
  image: string;
}

export enum TournamentType {
  BRASILEIRAO = 'Brasileirão',
  CHAMPIONS = 'Champions League',
  LIBERTADORES = 'Libertadores',
  WORLD_CUP = 'Copa do Mundo',
  CUSTOM = 'Outros'
}
