import pool from "../config/db";

const getAll = async () => {
  try {
    const users = await pool.query("SELECT * FROM user_table");
    return users.rows;
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const getOne = async (id) => {
  try {
    const users = await pool.query("SELECT * FROM user_table WHERE user_id = $1",[id] );
    return users.rows;
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const addUser = async (user) => {
  const { type, email, phone, name, address, cnpj, authId } = user;
  console.log(authId);

  try {
    const newUser = await pool.query(
      "INSERT INTO user_table (tipo_usuario , email, telefone, nome_completo, endereco, cnpj, auth_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
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
      "UPDATE user_table SET tipo_usuario = $1 , email = $2, telefone = $3, nome_completo = $4, endereco = $5, cnpj = $6 WHERE user_id = $7 RETURNING *",
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
      "UPDATE user_table SET status_conta = 'inativo' WHERE user_id = $1 RETURNING *",
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
  addUser,
  updateUser,
  deleteUser,
};
