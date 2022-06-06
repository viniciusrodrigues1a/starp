import { logger } from "./logger";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

function exitWithError(error: Error) {
  logger.debug(`App exited with error: ${error.message}`);
  logger.waitOnFinish(() => process.exit(ExitStatus.Failure));
}

function handleSignal(sig: string, closeOpenHandles: () => Promise<void>) {
  const forcedTimeout = 10 * 1000; // 10 seconds

  return process.on(sig, async () => {
    try {
      logger.debug("Gracefully shutting down");

      setTimeout(() => {
        logger.debug(
          "Couldn't close open handles in time, forcefully shutting down..."
        );
        process.exit(ExitStatus.Failure);
      }, forcedTimeout);

      await closeOpenHandles();
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      exitWithError(error);
    }
  });
}

try {
  console.log("App is running!"); // TODO

  const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
  exitSignals.forEach((sig) => {
    handleSignal(sig, async () => {
      console.log("Closing open handles"); // TODO
    });
  });
} catch (error: unknown) {
  if (!(error instanceof Error)) throw error;

  exitWithError(error);
}
