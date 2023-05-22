-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_name_key" ON "Sponsor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Network_name_key" ON "Network"("name");


-- CreateIndex
CREATE UNIQUE INDEX "Subject_idv1_key" ON "Subject"("idv1");

-- CreateIndex
CREATE UNIQUE INDEX "Level_idv1_key" ON "Level"("idv1");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_idv1_key" ON "Sponsor"("idv1");

-- CreateIndex
CREATE UNIQUE INDEX "Competence_idv1_key" ON "Competence"("idv1");

-- CreateIndex
CREATE UNIQUE INDEX "Network_idv1_key" ON "Network"("idv1");
