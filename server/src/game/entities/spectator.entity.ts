import { User } from '@prisma/client';
export class Spectator {
  public id: number;
  public name: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
  }
}
