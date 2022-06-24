export namespace GetPodcastAudioStreamRepositoryDTO {
  export type Response = Buffer | undefined;
}

export interface IGetPodcastAudioStreamRepository {
  getStream(id: string): Promise<GetPodcastAudioStreamRepositoryDTO.Response>;
}
