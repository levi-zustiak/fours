import { User } from '@prisma/client';

export enum STAGE {
  WAITING = 'waiting',
  PLAYING = 'playing',
  DISCONNECTED = 'disconnected',
  ENDED = 'ended',
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

export type Player = {
  wins: number;
  playingAs?: Position;
} & User;
