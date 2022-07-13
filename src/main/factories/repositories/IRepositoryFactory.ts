import {
  IFindAllFollowingPodcastsByUserRepository,
  IFindAllPodcastsRecentlyListenedRepository,
  IFindAllPodcastsRepository,
  IFindPodcastDetailsRepository,
  IGetPodcastAudioStreamRepository,
} from "@/modules/podcast/controllers/interfaces/repositories";

export interface IRepositoryFactory {
  makeFindAllPodcasts(): IFindAllPodcastsRepository;
  makeFindAllPodcastsRecentlyListenedRepository(): IFindAllPodcastsRecentlyListenedRepository;
  makeFindAllFollowingPodcastsByUserRepository(): IFindAllFollowingPodcastsByUserRepository;
  makeGetPodcastAudioStreamRepository(): IGetPodcastAudioStreamRepository;
  makeGetPodcastDetailsRepository(): IFindPodcastDetailsRepository;
}
