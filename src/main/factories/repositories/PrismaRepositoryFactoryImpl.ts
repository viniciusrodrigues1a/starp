import {
  IFindAllPodcastsRepository,
  IFindAllPodcastsRecentlyListenedRepository,
  IFindAllFollowingPodcastsByUserRepository,
  IGetPodcastAudioStreamRepository,
} from "@/modules/podcast/controllers/interfaces/repositories";
import { PrismaRepository } from "@/modules/podcast/infrastructure/repositories";
import { IRepositoryFactory } from "./IRepositoryFactory";

class PrismaRepositoryFactoryImpl implements IRepositoryFactory {
  makeGetPodcastAudioStreamRepository(): IGetPodcastAudioStreamRepository {
    return this.makePrismaRepository();
  }

  makeFindAllPodcasts(): IFindAllPodcastsRepository {
    return this.makePrismaRepository();
  }

  makeFindAllPodcastsRecentlyListenedRepository(): IFindAllPodcastsRecentlyListenedRepository {
    return this.makePrismaRepository();
  }

  makeFindAllFollowingPodcastsByUserRepository(): IFindAllFollowingPodcastsByUserRepository {
    return this.makePrismaRepository();
  }

  private makePrismaRepository() {
    return new PrismaRepository();
  }
}

export const prismaRepositoryFactoryImpl = new PrismaRepositoryFactoryImpl();
