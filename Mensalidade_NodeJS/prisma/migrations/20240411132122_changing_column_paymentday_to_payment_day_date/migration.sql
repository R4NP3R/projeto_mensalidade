/*
  Warnings:

  - You are about to drop the column `payment_day` on the `tb_clients` table. All the data in the column will be lost.
  - Added the required column `payment_day_date` to the `tb_clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_clients" DROP COLUMN "payment_day",
ADD COLUMN     "payment_day_date" TIMESTAMP(3) NOT NULL;
