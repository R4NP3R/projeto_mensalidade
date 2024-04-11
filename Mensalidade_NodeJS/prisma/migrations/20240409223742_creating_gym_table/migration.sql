/*
  Warnings:

  - You are about to drop the `late_payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gymId` to the `tb_clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "late_payment" DROP CONSTRAINT "late_payment_client_id_fkey";

-- AlterTable
ALTER TABLE "tb_clients" ADD COLUMN     "gymId" TEXT NOT NULL;

-- DropTable
DROP TABLE "late_payment";

-- CreateTable
CREATE TABLE "tb_gyms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tb_gyms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_late_payment" (
    "id" TEXT NOT NULL,
    "debtAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "tb_late_payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_late_payment_client_id_key" ON "tb_late_payment"("client_id");

-- AddForeignKey
ALTER TABLE "tb_clients" ADD CONSTRAINT "tb_clients_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "tb_gyms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_late_payment" ADD CONSTRAINT "tb_late_payment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "tb_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
