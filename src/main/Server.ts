import { Server as HTTPServer } from "http";
import express, { Express } from "express";
import { logger } from "./logger";

export class Server {
  private app: Express = express();
  private server: HTTPServer | null = null;

  async start() {
    this.server = this.app.listen(3333, () =>
      logger.verbose("Server is running on port 3333")
    );
  }

  stop() {
    if (this.server) {
      this.server.close(() => logger.verbose("HTTP server has been closed"));
    }
  }
}
