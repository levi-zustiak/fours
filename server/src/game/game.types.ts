import { User } from '@prisma/client';

export enum GameStage {
  WAITING = 'waiting',
  PLAYING = 'playing',
  RECONNECTING = 'reconnecting',
  DISCONNECTED = 'disconnected',
}

export type Position = 0 | 1;

export type Cell = {
  playedBy: Position;
  coords: Coords;
  winningToken: boolean;
};

export type Coords = {
  row: number;
  col: number;
};
