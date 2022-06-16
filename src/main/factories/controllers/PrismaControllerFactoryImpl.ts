import {
  GetMostListenedPodcastsController,
  GetFollowingPodcastsByUserController,
  GetRecentlyListenedPodcastsController,
  ListenToPodcastController,
} from "@/modules/podcast/controllers";
import { prismaRepositoryFactoryImpl } from "../repositories";
import { IControllerFactory } from "./IControllerFactory";

class PrismaControllerFactoryImpl implements IControllerFactory {
  makeListenToPodcastController(): ListenToPodcastController {
    return new ListenToPodcastController(
      prismaRepositoryFactoryImpl.makeGetPodcastAudioStreamRepository()
    );
  }

  makeGetMostListenedPodcastsController(): GetMostListenedPodcastsController {
    return new GetMostListenedPodcastsController(
      prismaRepositoryFactoryImpl.makeFindAllPodcasts()
    );
  }

  makeGetFollowingPodcastsByUserController(): GetFollowingPodcastsByUserController {
    return new GetFollowingPodcastsByUserController(
      prismaRepositoryFactoryImpl.makeFindAllFollowingPodcastsByUserRepository()
    );
  }

  makeGetRecentlyListenedPodcastsController(): GetRecentlyListenedPodcastsController {
    return new GetRecentlyListenedPodcastsController(
      prismaRepositoryFactoryImpl.makeFindAllPodcastsRecentlyListenedRepository()
    );
  }
}

export const prismaControllerFactoryImpl = new PrismaControllerFactoryImpl();
