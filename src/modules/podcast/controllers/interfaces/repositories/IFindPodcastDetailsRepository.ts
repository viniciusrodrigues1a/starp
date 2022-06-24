export namespace FindPodcastDetailsRepositoryDTO {
  export type Response = {
    id: string;
    lengthInMilliseconds: number;
    timesListened: number;
    timesStarred: number;
    title: string;
    artist: string;
    image: string | null;
    date: string;
    description: string;
  }[];
}

export interface IFindPodcastDetailsRepository {
  findPodcast(): Promise<FindPodcastDetailsRepositoryDTO.Response>;
}
