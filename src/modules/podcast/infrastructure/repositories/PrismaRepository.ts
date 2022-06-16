import path from "path";
import fs from "fs";
import mime from "mime";
import { connection } from "@/shared/infrastructure/database/connection";
import {
  FindAllFollowingPodcastsByUserRepositoryDTO,
  FindAllPodcastsRecentlyListenedRepositoryDTO,
  FindAllPodcastsRepositoryDTO,
  GetPodcastAudioStreamRepositoryDTO,
  IFindAllFollowingPodcastsByUserRepository,
  IFindAllPodcastsRecentlyListenedRepository,
  IFindAllPodcastsRepository,
  IGetPodcastAudioStreamRepository,
} from "../../controllers/interfaces/repositories";

export class PrismaRepository
  implements
    IFindAllPodcastsRepository,
    IFindAllPodcastsRecentlyListenedRepository,
    IFindAllFollowingPodcastsByUserRepository,
    IGetPodcastAudioStreamRepository
{
  async getStream(
    DTO: GetPodcastAudioStreamRepositoryDTO.Request
  ): Promise<GetPodcastAudioStreamRepositoryDTO.Response> {
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "uploads",
      `${DTO.id}.mp3`
    );

    if (!fs.existsSync(filePath)) {
      return undefined;
    }

    const audioSize = fs.statSync(filePath).size;

    const stream = fs.createReadStream(filePath, {
      start: Math.min(DTO.start, audioSize - 1),
      end: DTO.end,
    });

    const mimeType = mime.getType(path.extname(filePath)) || "audio/*";

    return { stream, audioSize, mimeType };
  }

  async findAllPodcasts(): Promise<FindAllPodcastsRepositoryDTO.Response> {
    const rows = await connection.podcast.findMany();

    const podcasts: FindAllPodcastsRepositoryDTO.Response = rows.map((r) => ({
      id: r.id,
      title: r.id,
      image: Buffer.from("image").toString(),
      artist: r.artist,
      lengthInMilliseconds: r.lengthInMilliseconds,
      timesListened: r.timesListened,
      timesStarred: r.timesStarred,
    }));

    return podcasts;
  }

  async findAllPodcastsRecentlyListed(): Promise<FindAllPodcastsRecentlyListenedRepositoryDTO.Response> {
    return this.findAllPodcasts();
  }

  async findAllFollowingPodcasts(
    userId: string
  ): Promise<FindAllFollowingPodcastsByUserRepositoryDTO.Response> {
    return this.findAllPodcasts();
  }
}
