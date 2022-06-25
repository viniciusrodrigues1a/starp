import { logger } from "../../../main/logger";
import { connection } from "./connection";
import { podcasts } from "./data";

const load = async () => {
  try {
    await connection.podcast.createMany({
      data: podcasts,
    });
    logger.verbose("Insert seeds with success");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await connection.$disconnect();
  }
};

load();
