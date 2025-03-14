import pool from "../config/db";

const getAll = async () => {
  try {
    const users = await pool.query("SELECT * FROM users_table");
    return users.rows;
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const getOne = async (id) => {
  try {
    const users = await pool.query(
      "SELECT * FROM users_table WHERE user_id = $1",
      [id]
    );
    return users.rows;
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const getOneFromAuth = async (authId) => {
  try {
    const user = await pool.query(
      `SELECT *
    FROM users_table
    INNER JOIN auth_table ON users_table.auth_id = auth_table.id
    WHERE auth_table.id = $1;`,
      [authId]
    );

    return user.rows[0];
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const addUser = async (user) => {
  const { type, email, phone, name, address, cnpj, authId } = user;

  try {
    const newUser = await pool.query(
      "INSERT INTO users_table (tipo_usuario , email, telefone, nome_completo, endereco, cnpj, auth_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [type, email, phone, name, address, cnpj, authId]
    );

    return newUser.rows[0];
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const updateUser = async (userId, user) => {
  const { type, email, phone, name, address, cnpj } = user;

  try {
    const updatedUser = await pool.query(
      "UPDATE users_table SET tipo_usuario = $1 , email = $2, telefone = $3, nome_completo = $4, endereco = $5, cnpj = $6 WHERE user_id = $7 RETURNING *",
      [type, email, phone, name, address, cnpj, userId]
    );

    return updatedUser.rows[0];
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await pool.query(
      "UPDATE users_table SET status_conta = 'inativo' WHERE user_id = $1 RETURNING *",
      [userId]
    );

    return deletedUser.rows[0];
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

export default {
  getAll,
  getOne,
  getOneFromAuth,
  addUser,
  updateUser,
  deleteUser,
};
