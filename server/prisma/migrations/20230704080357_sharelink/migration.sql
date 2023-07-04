/*
  Warnings:

  - A unique constraint covering the columns `[shareLink]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "shareLink" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_shareLink_key" ON "Post"("shareLink");
