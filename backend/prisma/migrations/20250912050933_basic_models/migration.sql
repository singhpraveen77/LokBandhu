/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('CITIZEN', 'ADMIN', 'GOVT');

-- CreateEnum
CREATE TYPE "public"."Department" AS ENUM ('WARD', 'ZONAL', 'COMMISSIONER');

-- CreateEnum
CREATE TYPE "public"."ProblemStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "department" "public"."Department",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'CITIZEN',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."Problem" (
    "id" SERIAL NOT NULL,
    "images" TEXT[],
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "voiceDescription" TEXT,
    "category" TEXT NOT NULL,
    "status" "public"."ProblemStatus" NOT NULL DEFAULT 'PENDING',
    "priority" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
