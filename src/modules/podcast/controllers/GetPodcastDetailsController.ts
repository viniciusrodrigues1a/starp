import { ControllerResponse } from "@/shared/controllers";
import { PodcastCouldntBeFoundError } from "./errors/PodcastCouldntBeFoundError";
import {
  FindPodcastDetailsRepositoryDTO,
  IFindPodcastDetailsRepository,
} from "./interfaces/repositories";

export namespace GetPodcastDetailsController {
  export type Request = {
    id: string;
  };
}

export class GetPodcastDetailsController {
  constructor(
    private readonly findPodcastDetailsRepository: IFindPodcastDetailsRepository
  ) {}

  async execute(
    request: GetPodcastDetailsController.Request
  ): ControllerResponse<FindPodcastDetailsRepositoryDTO.Response> {
    const { id } = request;

    const podcast = await this.findPodcastDetailsRepository.findPodcast(id);
    if (!podcast) throw new PodcastCouldntBeFoundError();

    return { content: podcast, links: [] };
  }
}
