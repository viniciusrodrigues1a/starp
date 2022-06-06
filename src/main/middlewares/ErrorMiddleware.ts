import {
  PodcastArtistIsInvalidError,
  PodcastLengthCantBeNegativeError,
  PodcastTitleIsInvalidError,
} from "@/modules/podcast/entities/errors";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;

  if (
    err instanceof PodcastArtistIsInvalidError ||
    err instanceof PodcastTitleIsInvalidError ||
    err instanceof PodcastLengthCantBeNegativeError
  ) {
    statusCode = 400;
  }

  res.status(statusCode).json({ error: err.message });
}
