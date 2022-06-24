import { ControllerResponse, Link } from "@/shared/controllers";
import { AudioStreamCouldntBeFoundError } from "./errors";
import {
  GetPodcastAudioStreamRepositoryDTO,
  IGetPodcastAudioStreamRepository,
} from "./interfaces/repositories";

export namespace ListenToPodcastController {
  export type Request = {
    id: string;
  };
}

export class ListenToPodcastController {
  constructor(
    private readonly getPodcastAudioStreamRepository: IGetPodcastAudioStreamRepository
  ) {}

  async execute(
    request: ListenToPodcastController.Request
  ): ControllerResponse<GetPodcastAudioStreamRepositoryDTO.Response> {
    const stream = await this.getPodcastAudioStreamRepository.getStream(
      request.id
    );

    if (!stream) throw new AudioStreamCouldntBeFoundError();

    const links = this.getLinks(request.id);

    return { content: stream, links };
  }

  private getLinks(podcastID: string): Link[] {
    const baseURI = `${process.env.BASE_URL}/podcasts`;

    return [
      {
        type: "GET",
        rel: "podcast",
        uri: `${baseURI}/${podcastID}`,
      },
      {
        type: "PATCH",
        rel: "podcast_add_to_starred",
        uri: `${baseURI}/${podcastID}/star`,
      },
      {
        type: "PATCH",
        rel: "podcast_remove_from_starred",
        uri: `${baseURI}/${podcastID}/unstar`,
      },
      {
        type: "PATCH",
        rel: "podcast_follow_artist",
        uri: `${baseURI}/${podcastID}/follow`,
      },
      {
        type: "PATCH",
        rel: "podcast_unfollow_artist",
        uri: `${baseURI}/${podcastID}/unfollow`,
      },
    ];
  }
}
