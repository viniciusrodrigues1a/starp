import { ControllerResponse, Link } from "@/shared/controllers";
import {
  FindAllFollowingPodcastsByUserRepositoryDTO,
  IFindAllFollowingPodcastsByUserRepository,
} from "./interfaces/repositories";

export namespace GetFollowingPodcastsByUserController {
  export type Request = {
    userId: string;
  };
}

export class GetFollowingPodcastsByUserController {
  constructor(
    private readonly findAllFollowingPodcastsRepository: IFindAllFollowingPodcastsByUserRepository
  ) {}

  async execute(
    request: GetFollowingPodcastsByUserController.Request
  ): ControllerResponse<FindAllFollowingPodcastsByUserRepositoryDTO.Response> {
    const { userId } = request;
    const podcasts =
      await this.findAllFollowingPodcastsRepository.findAllFollowingPodcasts(
        userId
      );
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
