export class PodcastTitleIsInvalidError extends Error {
  constructor() {
    const message = "The title must be at least 5 characters long";
    super(message);
    this.message = message;
  }
}
