export namespace GetPodcastAudioStreamRepositoryDTO {
  export type Response = Buffer | undefined;
}

export interface IGetPodcastAudioStreamRepository {
  getStream(
    id: string,
    segment: string | undefined
  ): Promise<GetPodcastAudioStreamRepositoryDTO.Response>;
}
