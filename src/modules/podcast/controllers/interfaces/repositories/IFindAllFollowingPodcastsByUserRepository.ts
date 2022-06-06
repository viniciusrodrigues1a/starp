export namespace FindAllFollowingPodcastsByUserRepositoryDTO {
  export type Response = {
    id: string;
    lengthInMilliseconds: number;
    title: string;
    artist: string;
    image: string | null;
  }[];
}
export interface IFindAllFollowingPodcastsByUserRepository {
  findAllFollowingPodcasts(
    userId: string
  ): Promise<FindAllFollowingPodcastsByUserRepositoryDTO.Response>;
}
