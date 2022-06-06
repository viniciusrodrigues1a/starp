import { ControllerResponse, Link } from "@/shared/controllers";
import {
  FindFollowingPodcastsByUserRepositoryDTO,
  IFindFollowingPodcastsByUserRepository,
} from "./interfaces/repositories";

export namespace GetFollowingPodcastsByUserController {
  export type Request = {
    userId: string;
  };
}

export class GetFollowingPodcastsByUserController {
  constructor(
    private readonly getFollowingPodcastsRepository: IFindFollowingPodcastsByUserRepository
  ) {}

  async execute(
    request: GetFollowingPodcastsByUserController.Request
  ): ControllerResponse<FindFollowingPodcastsByUserRepositoryDTO.Response> {
    const { userId } = request;
    const podcasts =
      await this.getFollowingPodcastsRepository.findFollowingPodcasts(userId);
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
