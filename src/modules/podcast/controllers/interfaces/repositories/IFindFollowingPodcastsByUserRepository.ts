export namespace FindFollowingPodcastsByUserRepositoryDTO {
  export type Response = {
    id: string;
    lengthInMilliseconds: number;
    title: string;
    artist: string;
    image: string | null;
  }[];
}
export interface IFindFollowingPodcastsByUserRepository {
  findFollowingPodcasts(
    userId: string
  ): Promise<FindFollowingPodcastsByUserRepositoryDTO.Response>;
}
