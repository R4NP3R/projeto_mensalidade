/*
  Warnings:

  - The primary key for the `tb_gyms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tb_gyms` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[gymId]` on the table `tb_gyms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tb_gyms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gymId` to the `tb_gyms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_clients" DROP CONSTRAINT "tb_clients_gymId_fkey";

-- AlterTable
ALTER TABLE "tb_gyms" DROP CONSTRAINT "tb_gyms_pkey",
ADD COLUMN     "gymId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tb_gyms_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_gyms_gymId_key" ON "tb_gyms"("gymId");

-- CreateIndex
CREATE UNIQUE INDEX "tb_gyms_name_key" ON "tb_gyms"("name");

-- AddForeignKey
ALTER TABLE "tb_clients" ADD CONSTRAINT "tb_clients_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "tb_gyms"("gymId") ON DELETE CASCADE ON UPDATE CASCADE;
