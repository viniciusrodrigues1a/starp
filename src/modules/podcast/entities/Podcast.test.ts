import crypto from "crypto";
import {
  PodcastArtistIsInvalidError,
  PodcastLengthCantBeNegativeError,
  PodcastTitleIsInvalidError,
} from "./errors";
import { PodcastDescriptionIsInvalidError } from "./errors/PodcastDescriptionIsInvalidError";
import { Podcast } from "./Podcast";

describe("Podcast entity", () => {
  const mockDescription = "This podcast has using for tests";
  it("should generate an UUID", () => {
    const spy = jest.spyOn(crypto, "randomUUID");
    Buffer.from("audio file"), 1132, "My podcast", "Artist";
    new Podcast({
      file: Buffer.from("audio file"),
      lengthInMilliseconds: 1132,
      title: "MyPodcast",
      artist: "Artist",
      description: mockDescription,
      createdAt: new Date(),
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should NOT be able to construct a Podcast if description is an empty string", () => {
    const when = () =>
      new Podcast({
        file: Buffer.from("audio file"),
        lengthInMilliseconds: 1132,
        title: "MyPodcast",
        artist: "Artist",
        description: "",
        createdAt: new Date(),
      });

    expect(when).toThrow(PodcastDescriptionIsInvalidError);
  });

  it("should NOT be able to construct a Podcast with a negative lengthInMilliseconds", () => {
    const when = () =>
      new Podcast({
        file: Buffer.from("audio file"),
        lengthInMilliseconds: -1132,
        title: "My podcast",
        artist: "Artist",
        description: mockDescription,
        createdAt: new Date(),
      });

    expect(when).toThrow(PodcastLengthCantBeNegativeError);
  });

  it("should NOT be able to set lengthInMilliseconds to a negative number", () => {
    const podcast = new Podcast({
      file: Buffer.from("audio file"),
      lengthInMilliseconds: 1132,
      title: "MyPodcast",
      artist: "Artist",
      description: mockDescription,
      createdAt: new Date(),
    });

    const when = () => podcast.setLengthInMilliseconds(-1132);

    expect(when).toThrow(PodcastLengthCantBeNegativeError);
  });

  it("should NOT be able to construct a Podcast if title has less than 5 characters", () => {
    const when = () =>
      new Podcast({
        file: Buffer.from("audio file"),
        lengthInMilliseconds: 1132,
        title: "abc",
        artist: "Artist",
        description: mockDescription,
        createdAt: new Date(),
      });

    expect(when).toThrow(PodcastTitleIsInvalidError);
  });

  it("should NOT be able to set title to a string that has less than 5 characters", () => {
    const podcast = new Podcast({
      file: Buffer.from("audio file"),
      lengthInMilliseconds: 1132,
      title: "My Podcast",
      artist: "Artist",
      description: mockDescription,
      createdAt: new Date(),
    });

    const when = () => podcast.setTitle("abc");

    expect(when).toThrow(PodcastTitleIsInvalidError);
  });

  it("should NOT be able to construct a Podcast if artist is an empty string", () => {
    const when = () =>
      new Podcast({
        file: Buffer.from("audio file"),
        lengthInMilliseconds: 1132,
        title: "MyPodcast",
        artist: "",
        description: mockDescription,
        createdAt: new Date(),
      });

    expect(when).toThrow(PodcastArtistIsInvalidError);
  });

  it("should NOT be able to set artist to an empty string", () => {
    const podcast = new Podcast({
      file: Buffer.from("audio file"),
      lengthInMilliseconds: 1132,
      title: "MyPodcast",
      artist: "Artist",
      description: mockDescription,
      createdAt: new Date(),
    });

    const when = () => podcast.setArtist("");

    expect(when).toThrow(PodcastArtistIsInvalidError);
  });
});
