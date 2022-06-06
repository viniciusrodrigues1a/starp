export namespace FindAllPodcastsRecentlyListenedRepositoryDTO {
  export type Response = {
    id: string;
    title: string;
    image: string | null;
  }[];
}

export interface IFindAllPodcastsRecentlyListenedRepository {
  findAllPodcastsRecentlyListed(): Promise<FindAllPodcastsRecentlyListenedRepositoryDTO.Response>;
}
