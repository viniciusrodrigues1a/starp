import {
  GetFollowingPodcastsByUserController,
  GetMostListenedPodcastsController,
  GetRecentlyListenedPodcastsController,
} from "@/modules/podcast/controllers";

export interface IControllerFactory {
  makeGetMostListenedPodcastsController(): GetMostListenedPodcastsController;
  makeGetFollowingPodcastsByUserController(): GetFollowingPodcastsByUserController;
  makeGetRecentlyListenedPodcastsController(): GetRecentlyListenedPodcastsController;
}
