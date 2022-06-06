import { ControllerResponse, Link } from "@/shared/controllers";
import {
  FindAllPodcastsRecentlyListenedRepositoryDTO,
  IFindAllPodcastsRecentlyListenedRepository,
} from "./interfaces/repositories";
export class GetRecentlyListedPodcastsController {
  constructor(
    private readonly findAllRecentlyListenedPodcastsRepository: IFindAllPodcastsRecentlyListenedRepository
  ) {}

  async execute(): ControllerResponse<FindAllPodcastsRecentlyListenedRepositoryDTO.Response> {
    const podcasts =
      await this.findAllRecentlyListenedPodcastsRepository.findAllPodcastsRecentlyListed();
    const links = this.getLinks(podcasts.map((p) => p.id));

    return { content: podcasts, links };
  }

  private getLinks(podcastsIDS: string[]): Link[] {
    const baseURI = `${process.env.BASE_URL}/podcasts`;
    const podcastsLinks: Link[] = podcastsIDS.map((id) => ({
      type: "GET",
      rel: "podcast",
      uri: `${baseURI}/${id}`,
    }));

    return podcastsLinks;
  }
}
