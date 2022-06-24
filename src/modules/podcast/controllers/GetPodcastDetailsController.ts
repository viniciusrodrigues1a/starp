import { IFindPodcastDetailsRepository } from "./interfaces/repositories";

export class GetPodcastDetailsController {
  constructor(
    private readonly findPodcastDetailsRepository: IFindPodcastDetailsRepository
  ) {}

  async execute() {}
}
