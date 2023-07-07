/*
  Warnings:

  - Added the required column `userId` to the `Demande` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demande" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Demande" ADD CONSTRAINT "Demande_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
