import { connection } from "@/shared/infrastructure/database/connection";
import {
  FindAllFollowingPodcastsByUserRepositoryDTO,
  FindAllPodcastsRecentlyListenedRepositoryDTO,
  FindAllPodcastsRepositoryDTO,
  IFindAllFollowingPodcastsByUserRepository,
  IFindAllPodcastsRecentlyListenedRepository,
  IFindAllPodcastsRepository,
} from "../../controllers/interfaces/repositories";

export class PrismaRepository
  implements
    IFindAllPodcastsRepository,
    IFindAllPodcastsRecentlyListenedRepository,
    IFindAllFollowingPodcastsByUserRepository
{
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

  findAllFollowingPodcasts(
    userId: string
  ): Promise<FindAllFollowingPodcastsByUserRepositoryDTO.Response> {
    return this.findAllPodcasts();
  }
}
