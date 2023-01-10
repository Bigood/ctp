-- CreateEnum
CREATE TYPE "Metier" AS ENUM ('TEACHER', 'SUPPORT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "job" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "presentation" TEXT,
ADD COLUMN     "shortPresentation" TEXT,
ADD COLUMN     "showEmail" BOOLEAN DEFAULT false,
ADD COLUMN     "showPhone" BOOLEAN DEFAULT false,
ADD COLUMN     "subjects" TEXT;
