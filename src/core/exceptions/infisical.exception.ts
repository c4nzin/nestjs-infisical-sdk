export class InfisicalException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InfisicalException';
  }
}
