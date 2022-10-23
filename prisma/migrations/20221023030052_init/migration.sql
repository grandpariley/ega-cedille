-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "parent" TEXT,
    "content" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
