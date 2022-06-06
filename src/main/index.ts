import { connection } from "@/shared/infrastructure/database/connection";
import { logger } from "./logger";
import { Server } from "./Server";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

function handleSignal(sig: string, closeOpenHandles: () => Promise<void>) {
  return process.on(sig, async () => {
    try {
      logger.verbose("Gracefully shutting down");

      await closeOpenHandles();
      exit(ExitStatus.Success);
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      exitWithError(error);
    }
  });
}

function exitWithError(error: Error) {
  logger.debug(`App exited with error: ${error.message}`);
  exit(ExitStatus.Failure);
}

function exit(status: number) {
  logger.waitOnFinish(() => process.exit(status));
}

try {
  const server = new Server();
  server.start();

  const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
  exitSignals.forEach((sig) => {
    handleSignal(sig, async () => {
      server.stop();
      await connection.$disconnect();
    });
  });
} catch (error: unknown) {
  if (!(error instanceof Error)) throw error;

  exitWithError(error);
}
