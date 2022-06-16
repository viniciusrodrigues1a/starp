import {
  IFindAllFollowingPodcastsByUserRepository,
  IFindAllPodcastsRecentlyListenedRepository,
  IFindAllPodcastsRepository,
  IGetPodcastAudioStreamRepository,
} from "@/modules/podcast/controllers/interfaces/repositories";

export interface IRepositoryFactory {
  makeFindAllPodcasts(): IFindAllPodcastsRepository;
  makeFindAllPodcastsRecentlyListenedRepository(): IFindAllPodcastsRecentlyListenedRepository;
  makeFindAllFollowingPodcastsByUserRepository(): IFindAllFollowingPodcastsByUserRepository;
  makeGetPodcastAudioStreamRepository(): IGetPodcastAudioStreamRepository;
}
