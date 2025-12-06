-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('Weapon', 'Armour', 'PowerUps');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('Common', 'Rare', 'Epic', 'Legendary');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "levelRequirement" INTEGER NOT NULL,
    "description" TEXT,
    "stats" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
