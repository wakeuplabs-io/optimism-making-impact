/*
  Warnings:

  - You are about to drop the column `position` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Infographic` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Step` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Step_position_categoryId_key";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "Infographic" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "position";
