-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('INFOGRAPHY', 'ITEMS', 'CARD');

-- CreateEnum
CREATE TYPE "CardStrength" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('RED', 'PINK', 'PURPLE', 'YELLOW', 'TAN', 'ORANGE', 'GREEN', 'LIGHTBLUE', 'BLUE', 'DARKBLUE');

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "link1" TEXT DEFAULT '',
    "link2" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "roundId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "type" "StepType" NOT NULL,
    "roundId" INTEGER NOT NULL,
    "smartListId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Infography" (
    "id" SERIAL NOT NULL,
    "markdown" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Infography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "markdown" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,
    "attributeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "strength" "CardStrength" NOT NULL,
    "position" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,
    "attributeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" "Color" NOT NULL DEFAULT 'LIGHTBLUE',
    "categoryId" INTEGER NOT NULL,
    "smartListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
<<<<<<<< HEAD:packages/api/prisma/migrations/20250124170622_0_init/migration.sql
CREATE TABLE "SmartList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmartList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
========
>>>>>>>> main:packages/api/prisma/migrations/20250122162048_0_init/migration.sql
CREATE TABLE "_CardToKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CardToKeyword_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Step_position_roundId_key" ON "Step"("position", "roundId");

-- CreateIndex
CREATE UNIQUE INDEX "Step_title_roundId_key" ON "Step"("title", "roundId");

-- CreateIndex
CREATE INDEX "_CardToKeyword_B_index" ON "_CardToKeyword"("B");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_smartListId_fkey" FOREIGN KEY ("smartListId") REFERENCES "SmartList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infography" ADD CONSTRAINT "Infography_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
<<<<<<<< HEAD:packages/api/prisma/migrations/20250124170622_0_init/migration.sql
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_smartListId_fkey" FOREIGN KEY ("smartListId") REFERENCES "SmartList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
========
>>>>>>>> main:packages/api/prisma/migrations/20250122162048_0_init/migration.sql
ALTER TABLE "_CardToKeyword" ADD CONSTRAINT "_CardToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToKeyword" ADD CONSTRAINT "_CardToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
