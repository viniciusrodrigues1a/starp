import fs from "fs";
import { Router } from "express";
import {
  ExpressAudioStreamingControllerAdapter,
  ExpressControllerAdapter,
} from "../adapters";
import { prismaControllerFactoryImpl } from "../factories/controllers/PrismaControllerFactoryImpl";

export const podcastsRoutes = Router();

podcastsRoutes.get(
  "/most-listened",
  ExpressControllerAdapter(
    prismaControllerFactoryImpl.makeGetMostListenedPodcastsController
  )
);

podcastsRoutes.get(
  "/following",
  ExpressControllerAdapter(
    prismaControllerFactoryImpl.makeGetFollowingPodcastsByUserController
  )
);

podcastsRoutes.get(
  "/recently-listened",
  ExpressControllerAdapter(
    prismaControllerFactoryImpl.makeGetRecentlyListenedPodcastsController
  )
);

podcastsRoutes.get(
  "/:id/listen",
  ExpressAudioStreamingControllerAdapter(
    prismaControllerFactoryImpl.makeListenToPodcastController
  )
);

podcastsRoutes.get(
  "/:id/details",
  ExpressControllerAdapter(
    prismaControllerFactoryImpl.makeGetPodcastDetailsController
  )
);
