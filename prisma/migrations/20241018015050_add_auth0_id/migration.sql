/*
  Warnings:

  - You are about to drop the column `armsLeftCuff` on the `Hoodie` table. All the data in the column will be lost.
  - You are about to drop the column `armsLeftSleeve` on the `Hoodie` table. All the data in the column will be lost.
  - You are about to drop the column `armsRightCuff` on the `Hoodie` table. All the data in the column will be lost.
  - You are about to drop the column `armsRightSleeve` on the `Hoodie` table. All the data in the column will be lost.
  - You are about to drop the column `torsoPocket` on the `Hoodie` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth0Id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `leftCuff` to the `Hoodie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leftSleeve` to the `Hoodie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rightCuff` to the `Hoodie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rightSleeve` to the `Hoodie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auth0Id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hoodie" DROP COLUMN "armsLeftCuff",
DROP COLUMN "armsLeftSleeve",
DROP COLUMN "armsRightCuff",
DROP COLUMN "armsRightSleeve",
DROP COLUMN "torsoPocket",
ADD COLUMN     "leftCuff" "Material" NOT NULL,
ADD COLUMN     "leftSleeve" "Material" NOT NULL,
ADD COLUMN     "rightCuff" "Material" NOT NULL,
ADD COLUMN     "rightSleeve" "Material" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "auth0Id" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_auth0Id_key" ON "User"("auth0Id");
