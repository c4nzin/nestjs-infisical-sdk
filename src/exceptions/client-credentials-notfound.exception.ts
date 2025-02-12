export class ClientCredentialsNotFoundException extends Error {
  constructor() {
    super('clientId and clientSecret are required');
  }
}
