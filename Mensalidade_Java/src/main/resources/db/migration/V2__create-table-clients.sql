CREATE TABLE clients (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    gym_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    phone_number VARCHAR(11) NOT NULL,
    initial_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment_day TIMESTAMP NOT NULL,
    address VARCHAR(255) NOT NULL,
    address_number VARCHAR(255) NOT NULL,
    CONSTRAINT client_gym_id_fkey FOREIGN KEY (gym_id) REFERENCES gyms(id) ON DELETE RESTRICT ON UPDATE CASCADE
)