/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Cedille" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "parent" TEXT,
    "content" TEXT,

    CONSTRAINT "Cedille_pkey" PRIMARY KEY ("id")
);