import pool from "../config/db";

const getAll = async () => {
  try {
    const bids = await pool.query("SELECT bids.*, u.nome_completo as supplier_name FROM bids JOIN users_table u ON u.user_id = bids.user_id");
    return bids.rows;
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};


const getOne = async (id) => {
  try {
    const bid = await pool.query(
      "SELECT bids.*, user.nome_completo FROM bids JOIN user_table user ON user.user_id = bids.user_id WHERE user_id = $1",
      [id]
    );
    return bid.rows;
  } catch (error) {
    console.log(error);
    return { error: error.message, severity: error.severity };
  }
};

const addBid = async (bid, userId) => {
  const { alertId, bidValue } = bid;

  try {
    const newProductAlert = await pool.query(
      `INSERT INTO bids (alert_id , bid_amount, user_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [alertId, bidValue, userId]
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

const rejectBid = async (bidId) => {
    try {
      const deletedBid = await pool.query(
        "UPDATE bids SET status = 'rejeitado' WHERE bid_id = $1 RETURNING *",
        [bidId]
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
  rejectBid
};
