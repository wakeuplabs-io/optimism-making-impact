-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "CardKeyword" DROP CONSTRAINT "CardKeyword_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardKeyword" DROP CONSTRAINT "CardKeyword_keywordId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_attributeId_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardKeyword" ADD CONSTRAINT "CardKeyword_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardKeyword" ADD CONSTRAINT "CardKeyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
