import {
  IFindAllFollowingPodcastsByUserRepository,
  IFindAllPodcastsRecentlyListenedRepository,
  IFindAllPodcastsRepository,
} from "@/modules/podcast/controllers/interfaces/repositories";

export interface IRepositoryFactory {
  makeFindAllPodcasts(): IFindAllPodcastsRepository;
  makeFindAllPodcastsRecentlyListenedRepository(): IFindAllPodcastsRecentlyListenedRepository;
  makeFindAllFollowingPodcastsByUserRepository(): IFindAllFollowingPodcastsByUserRepository;
}
