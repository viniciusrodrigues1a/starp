import { ControllerResponse, Link } from "../../../shared/controllers";
import {
  FindAllPodcastsRepositoryDTO,
  IFindAllPodcastsRepository,
} from "./interfaces/repositories";

export class GetMostListenedPodcastsController {
  constructor(
    private readonly findAllPodcastsRepository: IFindAllPodcastsRepository
  ) {}

  async execute(): ControllerResponse<FindAllPodcastsRepositoryDTO.Response> {
    const podcasts = await this.findAllPodcastsRepository.findAllPodcasts();
    const sortedPodcasts = podcasts
      .sort((a, b) => b.timesListened - a.timesListened)
      .slice(0, 20);

    const links = this.getLinks();

    return { content: sortedPodcasts, links };
  }

  private getLinks(): Link[] {
    const baseURI = `${process.env.BASE_URL}/podcasts`;
    const recentlyListenedLink: Link = {
      type: "GET",
      rel: "podcasts_recently_listened",
      uri: `${baseURI}/recently-listened`,
    };
    const followingLink: Link = {
      type: "GET",
      rel: "podcasts_recently_released_by_artists_you_follow",
      uri: `${baseURI}/following`,
    };

    return [recentlyListenedLink, followingLink];
  }
}
