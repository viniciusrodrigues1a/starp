export namespace FindPodcastDetailsRepositoryDTO {
  export type Response = {
    id: string;
    lengthInMilliseconds: number;
    timesListened: number;
    timesStarred: number;
    title: string;
    artist: string;
    image: string | null;
    date: Date;
    description: string;
  } | null;
}

export interface IFindPodcastDetailsRepository {
  findPodcast(
    podcastId: string
  ): Promise<FindPodcastDetailsRepositoryDTO.Response>;
}
