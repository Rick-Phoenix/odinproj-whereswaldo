-- CreateTable
CREATE TABLE "PlayerTimes" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL DEFAULT 'Anonymous',
    "time" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerTimes_pkey" PRIMARY KEY ("id")
);
