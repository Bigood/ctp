/*
  Warnings:

  - You are about to drop the `UserOnPractice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnPractice" DROP CONSTRAINT "UserOnPractice_practiceId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnPractice" DROP CONSTRAINT "UserOnPractice_userId_fkey";

-- DropTable
DROP TABLE "UserOnPractice";

-- CreateTable
CREATE TABLE "_UserPractices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserPractices_AB_unique" ON "_UserPractices"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPractices_B_index" ON "_UserPractices"("B");

-- AddForeignKey
ALTER TABLE "_UserPractices" ADD CONSTRAINT "_UserPractices_A_fkey" FOREIGN KEY ("A") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPractices" ADD CONSTRAINT "_UserPractices_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
