/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `tb_clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_clients_cpf_key" ON "tb_clients"("cpf");
