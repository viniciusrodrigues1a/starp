export namespace FindAllPodcastsRepositoryDTO {
  export type Response = {
    id: string;
    lengthInMilliseconds: number;
    timesListened: number;
    timesStarred: number;
    title: string;
    artist: string;
    image: string | null;
  }[];
}

export interface IFindAllPodcastsRepository {
  findAllPodcasts(): Promise<FindAllPodcastsRepositoryDTO.Response>;
}
