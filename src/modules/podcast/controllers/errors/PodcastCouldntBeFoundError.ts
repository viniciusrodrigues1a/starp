export class PodcastCouldntBeFoundError extends Error {
  constructor() {
    const message = "Podcast could not be found";
    super(message);
    this.message = message;
  }
}
