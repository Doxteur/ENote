/*
  Warnings:

  - You are about to drop the column `userId` on the `Demande` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Demande" DROP CONSTRAINT "Demande_userId_fkey";

-- AlterTable
ALTER TABLE "Demande" DROP COLUMN "userId";
