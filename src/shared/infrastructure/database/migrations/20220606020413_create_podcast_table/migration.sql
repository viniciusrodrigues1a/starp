-- CreateTable
CREATE TABLE "Podcast" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "lengthInMilliseconds" INTEGER NOT NULL,
    "timesListened" INTEGER NOT NULL,
    "timesStarred" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "imagePath" TEXT,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);
