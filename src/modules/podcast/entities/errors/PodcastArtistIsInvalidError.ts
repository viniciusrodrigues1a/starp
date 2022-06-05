export class PodcastArtistIsInvalidError extends Error {
  constructor() {
    const message = "The artist name must not be empty";
    super(message);
    this.message = message;
  }
}
