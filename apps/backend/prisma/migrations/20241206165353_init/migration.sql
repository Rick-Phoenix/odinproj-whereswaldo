-- CreateTable
CREATE TABLE "Picture" (
    "id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "coordinates" JSONB NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);
