-- CreateTable
CREATE TABLE "Practice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "synonym" TEXT[],
    "description" TEXT,
    "shortDescription" TEXT,
    "sources" TEXT[],

    CONSTRAINT "Practice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnPractice" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "practiceId" INTEGER NOT NULL,

    CONSTRAINT "UserOnPractice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnPractice_userId_practiceId_key" ON "UserOnPractice"("userId", "practiceId");

-- AddForeignKey
ALTER TABLE "UserOnPractice" ADD CONSTRAINT "UserOnPractice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnPractice" ADD CONSTRAINT "UserOnPractice_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
