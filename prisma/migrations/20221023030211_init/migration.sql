/*
  Warnings:

  - You are about to drop the `Cedille` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cedille";

-- CreateTable
CREATE TABLE "cedille" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "parent" TEXT,
    "content" TEXT,

    CONSTRAINT "cedille_pkey" PRIMARY KEY ("id")
);
