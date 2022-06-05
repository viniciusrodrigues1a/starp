export class PodcastLengthCantBeNegativeError extends Error {
  constructor() {
    const message = "The length of a podcast cannot be negative";
    super(message);
    this.message = message;
  }
}
