export class ProjectIdNotFoundException extends Error {
  constructor() {
    super(
      'Missing Project ID. Please specify a valid Project ID to enable secrets injection into process.env'
    );
  }
}
