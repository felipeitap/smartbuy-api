import pool from "../config/db";

const getAll = async () => {
  try {
    const products = await pool.query("SELECT * FROM product_alerts");
    return products.rows;
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const getOne = async (id) => {
  try {
    const prodcut = await pool.query(
      "SELECT * FROM product_alerts WHERE alert_id = $1",
      [id]
    );
    return prodcut.rows;
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const addProductAlert = async (productAlert, userId) => {
  const { productId, quantity, description, negociation } = productAlert;

  try {
    const newProductAlert = await pool.query(
      `INSERT INTO product_alerts (product_id , quantity_needed, description, negotiation_deadline, user_id_created)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [productId, quantity, description, negociation, userId]
    );

    if (!newProductAlert.severity) {
      return newProductAlert.rows[0];
    } else {
      throw new Error(newProductAlert.error);
    }
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const updateProductAlert = async (prodcutAlertId, productAlert, userId) => {
  const { productId, quantity, description, negociation } = productAlert;

  try {
    const updatedProduct = await pool.query(
      `UPDATE product_alerts 
       SET product_id = $1 , quantity_needed = $2, description = $3, negotiation_deadline = $4, user_id_created = $5 
       WHERE alert_id = $6 RETURNING *`,
      [productId, quantity, description, negociation, userId, prodcutAlertId]
    );

    if (!updatedProduct.severity) {
      return updatedProduct.rows[0];
    }else{
        throw new Error(updatedProduct.error)
    }

  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const deleteProductAlert = async (productAlertId) => {
  try {
    const deletedProduct = await pool.query(
      "UPDATE product_alerts SET status = 'cancelado' WHERE alert_id = $1 RETURNING *",
      [productAlertId]
    );

    return deletedProduct.rows[0];
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

export default {
  getAll,
  getOne,
  addProductAlert,
  updateProductAlert,
  deleteProductAlert,
};
