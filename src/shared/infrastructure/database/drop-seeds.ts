import { logger } from "../../../main/logger";
import { connection } from "./connection";

const load = async () => {
  try {
    await connection.podcast.deleteMany();
    logger.verbose("Drop seeds with success");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await connection.$disconnect();
  }
};

load();
