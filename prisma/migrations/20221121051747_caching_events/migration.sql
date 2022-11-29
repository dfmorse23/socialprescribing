/*
  Warnings:

  - You are about to drop the column `date` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Favorite` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "date",
DROP COLUMN "location",
DROP COLUMN "tag",
DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
