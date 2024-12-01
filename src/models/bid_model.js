import pool from "../config/db";

const getAll = async (id) => {
  try {
    const bids = await pool.query(
      `SELECT bids.*, bids.user_id as supplier_id, u.nome_completo as supplier_name 
      FROM bids JOIN users_table u ON u.user_id = bids.user_id 
      WHERE alert_id = $1
      ORDER BY status`,
      [id]
    );
    return bids.rows;
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const getOne = async (id) => {
  try {
    const bid = await pool.query(
      "SELECT bids.*, u.nome_completo as supplier_name FROM bids JOIN users_table u ON u.user_id = bids.user_id WHERE bids.user_id = $1",
      [id]
    );
    return bid.rows;
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const addBid = async (bid, userId) => {
  const { alertId, bidValue, delivery } = bid;

  try {
    const newProductAlert = await pool.query(
      `INSERT INTO bids (alert_id , bid_amount, user_id, delivery_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [alertId, bidValue, userId, delivery]
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

const cancelBid = async (bidId) => {
  try {
    const deletedBid = await pool.query(
      "UPDATE bids SET status = 'cancelado' WHERE bid_id = $1 RETURNING *",
      [bidId]
    );

    return deletedBid.rows[0];
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const updateStatus = async (bidId, status) => {
  try {
    const deletedBid = await pool.query(
      "UPDATE bids SET status = $1 WHERE bid_id = $2 RETURNING *",
      [status, bidId]
    );

    return deletedBid.rows[0];
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

export default {
  getAll,
  getOne,
  addBid,
  cancelBid,
  updateStatus,
};
