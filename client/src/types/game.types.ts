import { User } from './auth.types';

export enum GameStage {
  WAITING = 'waiting',
  PLAYING = 'playing',
  RECONNECTING = 'reconnecting',
  DISCONNECTED = 'disconnected',
}

export interface Coords {
  col: number;
  row: number;
}

export interface Token {
  playedBy: Position;
  coords: Coords;
  winningToken: boolean;
}

export type Position = 0 | 1;

export interface Player extends User {
  ready: boolean;
  playingAs: Position;
  wins: number;
}

export interface Engine {
  currentPlayer: Position;
  board: Array<Array<Token>>;
  playing: boolean;
  moveList: Token[];
}

export interface Game {
  id: string;
  players: Player[];
  spectators: User[];
  stage: GameStage;
  state: { rematch?: { challenger: number; recipient: number } };
  engine: Engine;
}
