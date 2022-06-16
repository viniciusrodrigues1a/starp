import {
  GetFollowingPodcastsByUserController,
  GetMostListenedPodcastsController,
  GetRecentlyListenedPodcastsController,
  ListenToPodcastController,
} from "@/modules/podcast/controllers";

export interface IControllerFactory {
  makeGetMostListenedPodcastsController(): GetMostListenedPodcastsController;
  makeGetFollowingPodcastsByUserController(): GetFollowingPodcastsByUserController;
  makeGetRecentlyListenedPodcastsController(): GetRecentlyListenedPodcastsController;
  makeListenToPodcastController(): ListenToPodcastController;
}
