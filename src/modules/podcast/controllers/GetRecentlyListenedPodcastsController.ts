import { ControllerResponse, Link } from "@/shared/controllers";
import {
  FindAllPodcastsRecentlyListenedRepositoryDTO,
  IFindAllPodcastsRecentlyListenedRepository,
} from "./interfaces/repositories";
export class GetRecentlyListedPodcastsController {
  constructor(
    private readonly getRecentlyListenedPodcastsRepository: IFindAllPodcastsRecentlyListenedRepository
  ) {}

  async execute(): ControllerResponse<FindAllPodcastsRecentlyListenedRepositoryDTO.Response> {
    const podcasts =
      await this.getRecentlyListenedPodcastsRepository.findAllPodcastsRecentlyListed();
    const links = this.getLinks();

    return { content: podcasts, links };
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
