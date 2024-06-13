import bidModel from "../models/bid_model";
import producAlertModel from "../models/product_alert_model";

const getBids = async (req, res) => {
  const { id } = req.params;
  try {
    const bids = await bidModel.getAll(id);

    res.status(200).json({ data: bids });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBid = async (req, res) => {
  const userId = req.userId;

  try {
    const bid = await bidModel.getOne(userId);

    if (bid) {
      res.status(200).json({ data: bid });
    } else {
      res.status(404).json({ message: "Bid not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBid = async (req, res) => {
  if (req.userType !== "cliente") {
    try {
      const bid = await bidModel.addBid(req.body, req.userId);

      if (!bid.error) {
        res.status(200).json({ data: bid });
      } else {
        throw new Error(bid.error);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const cancelBid = async (req, res) => {
  if (req.userType !== "cliente") {
    const { id } = req.params;

    try {
      if (!id) {
        throw new Error("Id is required");
      }

      const canceledBid = await bidModel.cancelBid(id);

      if (canceledBid.error) {
        console.log("Caiu no if canceledBid.error");
        throw new Error(canceledBid.error);
      }

      res.status(200).json({ message: "Bid canceled successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const updateStatus = async (req, res) => {
  if (req.userType === "cliente") {
    const { id } = req.params;
    const { status, alertId, supllierId } = req.body;

    try {
      if (!id) {
        throw new Error("Id is required");
      }

      if (status == "aceito") {
        const updatedBid = await bidModel.updateStatus(id, status);

        if (updatedBid.error) {
          throw new Error(updatedBid.error);
        }

        const updatedProductAlert = await producAlertModel.confirmProductAlert(
          alertId,
          supllierId
        );

        if (updatedProductAlert.error) {
          throw new Error(updatedProductAlert.error);
        }

        res.status(200).json({ message: "Bid status successfully updated" });
      } else {
        const updatedBid = await bidModel.updateStatus(id, status);

        if (updatedBid.error) {
          throw new Error(updatedBid.error);
        }

        res.status(200).json({ message: "Bid status successfully updated" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

export default {
  getBids,
  getBid,
  addBid,
  cancelBid,
  updateStatus,
};
