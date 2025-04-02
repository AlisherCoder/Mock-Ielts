/*
  Warnings:

  - The `status` column on the `Teachers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusTeachers" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Teachers" DROP COLUMN "status",
ADD COLUMN     "status" "StatusTeachers" NOT NULL DEFAULT 'ACTIVE';
