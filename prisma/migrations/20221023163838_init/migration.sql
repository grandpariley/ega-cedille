-- CreateTable
CREATE TABLE "cedille" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "parent" TEXT,
    "content" TEXT,

    CONSTRAINT "cedille_pkey" PRIMARY KEY ("id")
);
