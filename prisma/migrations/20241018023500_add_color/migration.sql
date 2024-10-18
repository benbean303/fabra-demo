/*
  Warnings:

  - Added the required column `color` to the `Hoodie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hoodie" ADD COLUMN     "color" TEXT NOT NULL;
