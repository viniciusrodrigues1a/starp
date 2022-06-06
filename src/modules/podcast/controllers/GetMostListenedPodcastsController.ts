import { ControllerResponse, Link } from "@/shared/controllers";
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

    const links = this.getLinks(sortedPodcasts.map((p) => p.id));

    console.log(links);

    return { content: sortedPodcasts, links };
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
