import path from "path";
import fs from "fs";
import { connection } from "@/shared/infrastructure/database/connection";
import {
  FindAllFollowingPodcastsByUserRepositoryDTO,
  FindAllPodcastsRecentlyListenedRepositoryDTO,
  FindAllPodcastsRepositoryDTO,
  FindPodcastDetailsRepositoryDTO,
  GetPodcastAudioStreamRepositoryDTO,
  IFindAllFollowingPodcastsByUserRepository,
  IFindAllPodcastsRecentlyListenedRepository,
  IFindAllPodcastsRepository,
  IFindPodcastDetailsRepository,
  IGetPodcastAudioStreamRepository,
} from "../../controllers/interfaces/repositories";

export class PrismaRepository
  implements
    IFindAllPodcastsRepository,
    IFindAllPodcastsRecentlyListenedRepository,
    IFindAllFollowingPodcastsByUserRepository,
    IGetPodcastAudioStreamRepository,
    IFindPodcastDetailsRepository
{
  async findPodcast(
    podcastId: string
  ): Promise<FindPodcastDetailsRepositoryDTO.Response> {
    const podcast = await connection.podcast.findUnique({
      where: { id: podcastId },
    });
    if (podcast) {
      return {
        ...podcast!,
        image: podcast.imagePath,
        date: podcast.createdAt,
      };
    }
    return podcast;
  }

  async getStream(
    id: string
  ): Promise<GetPodcastAudioStreamRepositoryDTO.Response> {
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "uploads",
      id,
      `index.m3u8`
    );

    if (!fs.existsSync(filePath)) {
      return undefined;
    }

    const buffer = await fs.promises.readFile(filePath);

    return buffer;
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
