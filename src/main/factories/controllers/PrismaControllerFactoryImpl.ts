import {
  GetMostListenedPodcastsController,
  GetFollowingPodcastsByUserController,
  GetRecentlyListenedPodcastsController,
} from "@/modules/podcast/controllers";
import { prismaRepositoryFactoryImpl } from "../repositories";
import { IControllerFactory } from "./IControllerFactory";

class PrismaControllerFactoryImpl implements IControllerFactory {
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
