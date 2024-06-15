import pool from "../config/db";

const getAll = async () => {
  try {
    const productAlerts = await pool.query(
      `SELECT pa.*, p.product_name, u.telefone 
      FROM product_alerts pa 
      JOIN products p ON p.product_id = pa.product_Id
      JOIN users_table u ON u.user_id = pa.user_id_created
      ORDER BY created_at DESC`
    );
    return productAlerts.rows;
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const getAllConfirmedBids = async (userId) => {
  try {
    const productAlerts = await pool.query(
      `SELECT pa.*, p.product_name, u.telefone 
      FROM product_alerts pa 
      JOIN products p ON p.product_id = pa.product_Id
      JOIN users_table u ON u.user_id = pa.user_id_created
      WHERE user_id_assigned = $1
      ORDER BY created_at DESC`,
      [userId]
    );
    return productAlerts.rows;
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const getOne = async (id) => {
  try {
    const prodcutAlert = await pool.query(
      "SELECT pa.*, p.product_name FROM product_alerts pa JOIN products p ON p.product_id = pa.product_Id WHERE alert_id = $1",
      [id]
    );
    return prodcutAlert.rows;
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
    const updatedProductAlert = await pool.query(
      `UPDATE product_alerts 
       SET product_id = $1 , quantity_needed = $2, description = $3, negotiation_deadline = $4, user_id_created = $5 
       WHERE alert_id = $6 RETURNING *`,
      [productId, quantity, description, negociation, userId, prodcutAlertId]
    );

    if (!updatedProductAlert.severity) {
      return updatedProductAlert.rows[0];
    } else {
      throw new Error(updatedProductAlert.error);
    }
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const deleteProductAlert = async (productAlertId) => {
  try {
    const deletedProductAlert = await pool.query(
      "UPDATE product_alerts SET status = 'cancelado' WHERE alert_id = $1 RETURNING *",
      [productAlertId]
    );

    return deletedProductAlert.rows[0];
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const confirmProductAlert = async (productAlertId, supllierId) => {
  try {
    const confirmedAlert = await pool.query(
      "UPDATE product_alerts SET status = 'concluído', user_id_assigned = $1 WHERE alert_id = $2 RETURNING *",
      [supllierId, productAlertId]
    );

    return confirmedAlert.rows[0];
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
  confirmProductAlert,
  getAllConfirmedBids
};
