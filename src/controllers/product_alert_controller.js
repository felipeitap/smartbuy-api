import productAlertModel from "../models/product_alert_model";

const getProductAlerts = async (req, res) => {
  if (req.userType !== "cliente") {
    try {
      const productsAlert = await productAlertModel.getAll();

      res.status(200).json({ data: productsAlert });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    const id = req.userId;
    try {
      const productsAlert = await productAlertModel.getAllByUser(id);

      res.status(200).json({ data: productsAlert });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const getConfirmedProductAlerts = async (req, res) => {
  if (req.userType !== "cliente") {
    try {
      const productsAlert = await productAlertModel.getAllConfirmedBids(
        req.userId
      );

      res.status(200).json({ data: productsAlert });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const getProductAlert = async (req, res) => {
  if (req.userType === "cliente") {
    const { id } = req.params;

    try {
      if (!id) {
        throw new Error("Id is required");
      }

      const productAlert = await productAlertModel.getOne(id);

      if (productAlert) {
        res.status(200).json({ data: productAlert });
      } else {
        res.status(404).json({ message: "Product Alert not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const addProductAlert = async (req, res) => {
  if (req.userType === "cliente") {
    try {
      const productAlert = await productAlertModel.addProductAlert(
        req.body,
        req.userId
      );

      if (!productAlert.error) {
        res.status(200).json({ data: productAlert });
      } else {
        throw new Error(productAlert.error);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const updateProductAlert = async (req, res) => {
  if (req.userType === "cliente") {
    const { id } = req.params;

    try {
      if (!id) {
        throw new Error("Id is required");
      }

      const updatedProductAlert = await productAlertModel.updateProductAlert(
        id,
        req.body,
        req.userId
      );

      if (updatedProductAlert.error) {
        throw new Error(updatedProductAlert.error);
      }
      res.status(200).json({
        data: updatedProductAlert,
        message: "Product Alert updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const deleteProductAlert = async (req, res) => {
  if (req.userType === "cliente") {
    const { id } = req.params;

    try {
      if (!id) {
        throw new Error("Id is required");
      }

      const deletedAlert = await productAlertModel.deleteProductAlert(id);

      if (deletedAlert.error) {
        throw new Error(deletedAlert.error);
      }

      res.status(200).json({ message: "Product Alert deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

export default {
  getProductAlerts,
  getProductAlert,
  addProductAlert,
  updateProductAlert,
  deleteProductAlert,
  getConfirmedProductAlerts,
};
