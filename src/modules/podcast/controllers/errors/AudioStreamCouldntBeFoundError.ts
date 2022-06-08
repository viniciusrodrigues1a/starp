export class AudioStreamCouldntBeFoundError extends Error {
  constructor() {
    const message = "Audio stream could not be found";
    super(message);
    this.message = message;
  }
}
