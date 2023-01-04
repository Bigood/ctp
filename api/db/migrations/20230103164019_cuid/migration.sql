/*
  Warnings:

  - A unique constraint covering the columns `[cuid]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cuid]` on the table `Practice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `cuid` was added to the `Organization` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cuid` was added to the `Practice` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "instanceId" INTEGER;

-- AlterTable
ALTER TABLE "Practice" ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "instanceId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_cuid_key" ON "Organization"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "Practice_cuid_key" ON "Practice"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_cuid_key" ON "User"("cuid");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "Instance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "Instance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
