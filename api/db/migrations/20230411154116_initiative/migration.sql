-- CreateEnum
CREATE TYPE "TypeCompetence" AS ENUM ('DISCIPLINARY', 'TRANSVERAL');

-- CreateTable
CREATE TABLE "Initiative" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "idv1" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "title" TEXT,
    "outsideUsers" TEXT,
    "contact" TEXT,
    "descriptionMD" TEXT,
    "conditionsMD" TEXT,
    "evaluationMD" TEXT,
    "strengthsMD" TEXT,
    "transferabilityMD" TEXT,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Initiative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "idv1" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "idv1" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "idv1" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" SERIAL NOT NULL,
    "idv1" TEXT,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "logo" TEXT,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "idv1" TEXT,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "filename" TEXT,
    "description" TEXT,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competence" (
    "id" SERIAL NOT NULL,
    "idv1" TEXT,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "Competence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" SERIAL NOT NULL,
    "idv1" TEXT,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "logo" TEXT,
    "authorId" INTEGER,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InitiativeToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InitiativeToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InitiativeToLevel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InitiativeToResource" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InitiativeToNetwork" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InitiativeToSponsor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InitiativeUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InitiativeOrganizations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InitiativePractices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CompetenceToInitiative" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InitiativeToTag_AB_unique" ON "_InitiativeToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_InitiativeToTag_B_index" ON "_InitiativeToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InitiativeToSubject_AB_unique" ON "_InitiativeToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_InitiativeToSubject_B_index" ON "_InitiativeToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InitiativeToLevel_AB_unique" ON "_InitiativeToLevel"("A", "B");

-- CreateIndex
CREATE INDEX "_InitiativeToLevel_B_index" ON "_InitiativeToLevel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InitiativeToResource_AB_unique" ON "_InitiativeToResource"("A", "B");

-- CreateIndex
CREATE INDEX "_InitiativeToResource_B_index" ON "_InitiativeToResource"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InitiativeToNetwork_AB_unique" ON "_InitiativeToNetwork"("A", "B");

-- CreateIndex
CREATE INDEX "_InitiativeToNetwork_B_index" ON "_InitiativeToNetwork"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InitiativeToSponsor_AB_unique" ON "_InitiativeToSponsor"("A", "B");

-- CreateIndex
CREATE INDEX "_InitiativeToSponsor_B_index" ON "_InitiativeToSponsor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InitiativeUsers_AB_unique" ON "_InitiativeUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_InitiativeUsers_B_index" ON "_InitiativeUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InitiativeOrganizations_AB_unique" ON "_InitiativeOrganizations"("A", "B");

-- CreateIndex
CREATE INDEX "_InitiativeOrganizations_B_index" ON "_InitiativeOrganizations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InitiativePractices_AB_unique" ON "_InitiativePractices"("A", "B");

-- CreateIndex
CREATE INDEX "_InitiativePractices_B_index" ON "_InitiativePractices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompetenceToInitiative_AB_unique" ON "_CompetenceToInitiative"("A", "B");

-- CreateIndex
CREATE INDEX "_CompetenceToInitiative_B_index" ON "_CompetenceToInitiative"("B");

-- AddForeignKey
ALTER TABLE "Initiative" ADD CONSTRAINT "Initiative_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Network" ADD CONSTRAINT "Network_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToTag" ADD CONSTRAINT "_InitiativeToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToTag" ADD CONSTRAINT "_InitiativeToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToSubject" ADD CONSTRAINT "_InitiativeToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToSubject" ADD CONSTRAINT "_InitiativeToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToLevel" ADD CONSTRAINT "_InitiativeToLevel_A_fkey" FOREIGN KEY ("A") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToLevel" ADD CONSTRAINT "_InitiativeToLevel_B_fkey" FOREIGN KEY ("B") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToResource" ADD CONSTRAINT "_InitiativeToResource_A_fkey" FOREIGN KEY ("A") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToResource" ADD CONSTRAINT "_InitiativeToResource_B_fkey" FOREIGN KEY ("B") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToNetwork" ADD CONSTRAINT "_InitiativeToNetwork_A_fkey" FOREIGN KEY ("A") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToNetwork" ADD CONSTRAINT "_InitiativeToNetwork_B_fkey" FOREIGN KEY ("B") REFERENCES "Network"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToSponsor" ADD CONSTRAINT "_InitiativeToSponsor_A_fkey" FOREIGN KEY ("A") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeToSponsor" ADD CONSTRAINT "_InitiativeToSponsor_B_fkey" FOREIGN KEY ("B") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeUsers" ADD CONSTRAINT "_InitiativeUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeUsers" ADD CONSTRAINT "_InitiativeUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeOrganizations" ADD CONSTRAINT "_InitiativeOrganizations_A_fkey" FOREIGN KEY ("A") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativeOrganizations" ADD CONSTRAINT "_InitiativeOrganizations_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativePractices" ADD CONSTRAINT "_InitiativePractices_A_fkey" FOREIGN KEY ("A") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InitiativePractices" ADD CONSTRAINT "_InitiativePractices_B_fkey" FOREIGN KEY ("B") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetenceToInitiative" ADD CONSTRAINT "_CompetenceToInitiative_A_fkey" FOREIGN KEY ("A") REFERENCES "Competence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetenceToInitiative" ADD CONSTRAINT "_CompetenceToInitiative_B_fkey" FOREIGN KEY ("B") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

