/*
  Warnings:

  - Made the column `link1` on table `Round` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link2` on table `Round` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Round" ALTER COLUMN "link1" SET NOT NULL,
ALTER COLUMN "link2" SET NOT NULL;
