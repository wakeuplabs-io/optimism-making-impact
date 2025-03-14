/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Attribute` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_categoryId_fkey";

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "categoryId";
