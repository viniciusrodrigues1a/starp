export class PodcastDescriptionIsInvalidError extends Error {
  constructor() {
    const message = "The description must not be empty";
    super(message);
    this.message = message;
  }
}
