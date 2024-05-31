import pool from "../config/db";

const getAll = async () => {
  try {
    const auth = await pool.query("SELECT * FROM auth_table");
    return auth.rows;
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const getOneByUserName = async (username) => {
  try {
    const auth = await pool.query("SELECT * FROM auth_table WHERE username = $1",[username] );
    
    return auth.rows[0]
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const getHash = async (auth) => {
  const { username } = auth;

  try {
    const hash = await pool.query(
      "SELECT password_hash FROM auth_table WHERE username = $1",
      [username]
    );

    if(hash.rows.length > 0){
      return hash.rows[0].password_hash;
    }else{
      throw new Error("User not found or password not corretct")
    }
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

const addAuth = async (auth) => {
  const { username, password } = auth;

  try {
    const existingUser = await pool.query("SELECT * FROM  auth_table WHERE username = $1", [username])

    if(existingUser.rows.length > 0 ){
      throw new Error("User alredy exists")
    }

    const newAuth = await pool.query(
      "INSERT INTO auth_table (username, password_hash) VALUES ($1, $2) RETURNING *",
      [username, password]
    );
    return newAuth.rows[0].id;
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

export default {
  getAll,
  getHash,
  addAuth,
  getOneByUserName
};
