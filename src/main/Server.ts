import { Server as HTTPServer } from "http";
import express, { Express } from "express";
import { logger } from "./logger";
import { podcastsRoutes } from "./routes";
import { errorMiddleware } from "./middlewares";

export class Server {
  public readonly app: Express = express();
  private server: HTTPServer | null = null;

  constructor() {
    this.addMiddlewares();
    this.addRoutes();
  }

  start() {
    this.server = this.app.listen(3333, () =>
      logger.verbose("Server is running on port 3333")
    );
  }

  private addMiddlewares() {
    this.app.use(express.json());
    this.app.use(errorMiddleware);
  }

  private addRoutes() {
    this.app.use("/podcasts", podcastsRoutes);
  }

  stop() {
    if (this.server) {
      this.server.close(() => logger.verbose("HTTP server has been closed"));
    }
  }
}
