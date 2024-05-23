import pool from "../config/db";

const getAll = async () => {
  try {
    const products = await pool.query("SELECT * FROM products");
        return products.rows;
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const getOne = async (id) => {
    try {
    const prodcut = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [id]
    );
    return prodcut.rows;
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const addProduct = async (prodcut, userId) => {
  const { name, description, category } = prodcut;

  try {
    const newProduct = await pool.query(
      "INSERT INTO products (product_name , product_description, product_category, user_id_created) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, category, userId]
    );

    return newProduct.rows[0];
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const updateProduct = async (prodcutId, prodcut) => {
  const { name, description, category, userId } = prodcut;

  try {
    const updatedProduct = await pool.query(
      "UPDATE products SET product_name = $1 , porduct_description = $2, product_category = $3, user_id_created = $4 WHERE product_id = $5 RETURNING *",
      [name, description, category, userId, prodcutId]
    );

    return updatedProduct.rows[0];
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await pool.query(
      "UPDATE products SET active = false WHERE product_id = $1 RETURNING *",
      [productId]
    );

    return deletedProduct.rows[0];
  } catch (error) {
    console.log(error);
    return { message: error.message, severity: error.severity };
  }
};

export default {
  getAll,
  getOne,
  addProduct,
  updateProduct,
  deleteProduct,
};
