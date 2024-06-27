CREATE UNIQUE INDEX clients_cpf_key ON clients(cpf);
CREATE UNIQUE INDEX clients_phone_number_key ON clients(phone_number);
CREATE UNIQUE INDEX late_payment_client_id_key ON late_payment(client_id);
