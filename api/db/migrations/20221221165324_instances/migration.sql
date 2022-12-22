-- AlterTable
ALTER TABLE "User" ADD COLUMN     "instanceId" INTEGER;

-- CreateTable
CREATE TABLE "Instance" (
    "id" SERIAL NOT NULL,
    "host" TEXT NOT NULL,
    "version" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instance_host_key" ON "Instance"("host");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "Instance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
