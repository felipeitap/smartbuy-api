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

const createExtension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';

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

const createAuthTableQuery = `
CREATE TABLE IF NOT EXISTS auth_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);
`;

const createProductTableQuery = `CREATE TABLE IF NOT EXISTS products (
  product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  product_description VARCHAR(255),
  product_category VARCHAR(100),
  active BOOLEAN DEFAULT TRUE,
  user_id_created UUID NOT NULL,
  FOREIGN KEY (user_id_created) REFERENCES users_table(user_id)
);`;

const createProductAlertTableQuery = `CREATE TABLE IF NOT EXISTS  product_alerts (
  alert_id UUID PRIMARY KEY,
  product_id UUID NOT NULL,
  quantity_needed INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT CHECK (status IN ('pendente', 'concluído')) DEFAULT 'pendente',
  user_id_created UUID NOT NULL,
  user_id_assigned UUID,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (user_id_created) REFERENCES users_table(user_id),
  FOREIGN KEY (user_id_assigned) REFERENCES users_table(user_id)
);`;

const createBidTableQuery = `CREATE TABLE IF NOT EXISTS bids (
  bid_id UUID PRIMARY KEY,
  alert_id UUID NOT NULL,
  user_id UUID NOT NULL,
  bid_amount DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT CHECK (status IN ('pendente', 'aceito', 'rejeitado')) DEFAULT 'pendente',
  FOREIGN KEY (alert_id) REFERENCES product_alerts(alert_id),
  FOREIGN KEY (user_id) REFERENCES users_table(user_id)
);`;

async function createTables() {
  const client = await pool.connect();
  
  try {
    await client.query(createExtension);
    await client.query(createAuthTableQuery);
    await client.query(createUserTableQuery);
    await client.query(createProductTableQuery);
    await client.query(createProductAlertTableQuery);
    await client.query(createBidTableQuery);
  } catch (error) {
    throw new Error("Error during tables creation:", error);
  } finally {
    client.release();
  }
}

createTables()
  .then(() => {
    console.log("Data base started sucessfuly.");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export default pool;
