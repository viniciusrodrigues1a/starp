import crypto from "crypto";
import {
  PodcastArtistIsInvalidError,
  PodcastLengthCantBeNegativeError,
  PodcastTitleIsInvalidError,
} from "./errors";
import { Podcast } from "./Podcast";

describe("Podcast entity", () => {
  it("should generate an UUID", () => {
    const spy = jest.spyOn(crypto, "randomUUID");

    new Podcast(Buffer.from("audio file"), 1132, "My podcast", "Artist");

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should NOT be able to construct a Podcast with a negative lengthInMilliseconds", () => {
    const when = () =>
      new Podcast(Buffer.from("audio file"), -1132, "My podcast", "Artist");

    expect(when).toThrow(PodcastLengthCantBeNegativeError);
  });

  it("should NOT be able to set lengthInMilliseconds to a negative number", () => {
    const podcast = new Podcast(
      Buffer.from("audio file"),
      1132,
      "My podcast",
      "Artist"
    );

    const when = () => podcast.setLengthInMilliseconds(-1132);

    expect(when).toThrow(PodcastLengthCantBeNegativeError);
  });

  it("should NOT be able to construct a Podcast if title has less than 5 characters", () => {
    const when = () =>
      new Podcast(Buffer.from("audio file"), 1132, "abc", "Artist");

    expect(when).toThrow(PodcastTitleIsInvalidError);
  });

  it("should NOT be able to set title to a string that has less than 5 characters", () => {
    const podcast = new Podcast(
      Buffer.from("audio file"),
      1132,
      "My podcast",
      "Artist"
    );

    const when = () => podcast.setTitle("abc");

    expect(when).toThrow(PodcastTitleIsInvalidError);
  });

  it("should NOT be able to construct a Podcast if artist is an empty string", () => {
    const when = () =>
      new Podcast(Buffer.from("audio file"), 1132, "My podcast", "");

    expect(when).toThrow(PodcastArtistIsInvalidError);
  });

  it("should NOT be able to set artist to an empty string", () => {
    const podcast = new Podcast(
      Buffer.from("audio file"),
      1132,
      "My podcast",
      "Artist"
    );

    const when = () => podcast.setArtist("");

    expect(when).toThrow(PodcastArtistIsInvalidError);
  });
});
