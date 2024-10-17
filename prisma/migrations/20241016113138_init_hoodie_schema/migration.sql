-- CreateEnum
CREATE TYPE "Material" AS ENUM ('BLACK_FABRIC', 'WHITE_FABRIC', 'GREY_FABRIC');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hoodie" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "torsoFront" "Material" NOT NULL,
    "torsoBack" "Material" NOT NULL,
    "torsoBand" "Material" NOT NULL,
    "torsoPocket" "Material" NOT NULL,
    "armsLeftSleeve" "Material" NOT NULL,
    "armsLeftCuff" "Material" NOT NULL,
    "armsRightSleeve" "Material" NOT NULL,
    "armsRightCuff" "Material" NOT NULL,
    "hood" "Material" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hoodie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Hoodie" ADD CONSTRAINT "Hoodie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
