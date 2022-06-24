import crypto from "crypto";
import {
  PodcastArtistIsInvalidError,
  PodcastLengthCantBeNegativeError,
  PodcastTitleIsInvalidError,
} from "./errors";
import { PodcastDescriptionIsInvalidError } from "./errors/PodcastDescriptionIsInvalidError";

type PodcastProps = {
  file: Buffer;
  lengthInMilliseconds: number;
  title: string;
  artist: string;
  id?: string;
  description: string;
};

export class Podcast {
  private id: string;
  private file: Buffer;
  private lengthInMilliseconds: number;
  private timesListened: number;
  private timesStarred: number;
  private title: string;
  private artist: string;
  private image: string | null;
  private description: string;

  constructor({
    artist,
    description,
    file,
    id,
    lengthInMilliseconds,
    title,
  }: PodcastProps) {
    this.id = id || crypto.randomUUID();
    this.file = file;
    this.setLengthInMilliseconds(lengthInMilliseconds);
    this.setTitle(title);
    this.setArtist(artist);
    this.timesListened = 0;
    this.timesStarred = 0;
    this.image = null;
    this.setDescription(description);
  }

  public getID(): string {
    return this.id;
  }

  public getFile(): Buffer {
    return this.file;
  }

  public setFile(file: Buffer) {
    this.file = file;
  }

  public getLengthInMilliseconds(): number {
    return this.lengthInMilliseconds;
  }

  public setLengthInMilliseconds(length: number) {
    if (length < 0) throw new PodcastLengthCantBeNegativeError();
    this.lengthInMilliseconds = length;
  }

  public getTimesListened(): number {
    return this.timesListened;
  }

  public incrementTimesListened(by = 1) {
    this.timesListened += by;
  }

  public getTimesStarred(): number {
    return this.timesStarred;
  }

  public incrementTimesStarred(by = 1) {
    this.timesStarred += by;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string) {
    if (title.length < 5) throw new PodcastTitleIsInvalidError();
    this.title = title;
  }

  public getArtist(): string {
    return this.artist;
  }

  public setArtist(artist: string) {
    if (artist.length === 0) throw new PodcastArtistIsInvalidError();
    this.artist = artist;
  }

  public getImage(): string | null {
    return this.image;
  }

  public setImage(image: string | null) {
    this.image = image;
  }

  public setDescription(description: string | null) {
    if (!description || description.length === 0)
      throw new PodcastDescriptionIsInvalidError();

    this.description = description!;
  }
}
