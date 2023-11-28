export class ParentContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParentContextError';
  }
}
