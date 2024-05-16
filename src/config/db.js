/* eslint-disable no-undef */
import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const createExtension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users_table (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo_usuario VARCHAR(255),
    nome_completo VARCHAR(255),
    email VARCHAR(255),
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    cnpj VARCHAR(20),
    status_conta VARCHAR(10) DEFAULT 'ativo',
    data_registro DATE DEFAULT CURRENT_DATE,
    auth_id UUID REFERENCES auth_table(id)
)
`;

const createAuthTableQuey = `
CREATE TABLE IF NOT EXISTS auth_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);
`;

const createProductQuery = `CREATE TABLE products (
  product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  product_description VARCHAR(255),
  product_category VARCHAR(100),
  user_id_created UUID NOT NULL,
  FOREIGN KEY (user_id_created) REFERENCES users_table(user_id)
);`

async function createTables() {
  try {
    const client = await pool.connect();

    await client.query(createExtension);
    await client.query(createAuthTableQuey);
    await client.query(createUserTableQuery);

    client.release();
  } catch (error) {
    console.error("Error during tables creation:", error);
  }
}

createTables()
  .then(() => {
    console.log("Data base started sucessfuly.");
  })
  .catch((error) => {
    console.error(error);
  });

export default pool;
