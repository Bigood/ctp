-- AlterTable
ALTER TABLE "User"
    ADD COLUMN "idv1" TEXT,
    ADD COLUMN "eppn" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");