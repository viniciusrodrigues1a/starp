import { PrismaClient } from "@prisma/client";

let dbURL = process.env.POSTGRES_URL;

if (process.env.NODE_ENV === "test") {
  dbURL = process.env.TEST_POSTGRES_URL;
}

export const connection = new PrismaClient({
  datasources: { db: { url: dbURL } },
});
