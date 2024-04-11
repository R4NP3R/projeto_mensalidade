-- CreateTable
CREATE TABLE "tb_clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "initial_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_day" INTEGER NOT NULL,
    "adress" TEXT NOT NULL,
    "adressNumber" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "tb_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "late_payment" (
    "id" TEXT NOT NULL,
    "debtAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "late_payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_clients_phoneNumber_key" ON "tb_clients"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "tb_clients_slug_key" ON "tb_clients"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "late_payment_client_id_key" ON "late_payment"("client_id");

-- AddForeignKey
ALTER TABLE "late_payment" ADD CONSTRAINT "late_payment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "tb_clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
