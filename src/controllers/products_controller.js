import productModel from "../models/product_model";

const getProducts = async (req, res) => {
  if (req.userType === "cliente") {
    try {
      const products = await productModel.getAll(req.userId);

      res.status(200).json({ data: products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const getProduct = async (req, res) => {
  if (req.userType === "cliente") {
    const { id } = req.params;

    try {
      if (!id) {
        throw new Error("Id is required");
      }

      const product = await productModel.getOne(id);

      if (product) {
        res.status(200).json({ data: product });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const addProducts = async (req, res) => {
  if (req.userType === "cliente") {
    try {
      const products = await productModel.addProduct(req.body, req.userId);
      if (!products.severity) {
        res.status(200).json({ data: products });
      } else {
        throw new Error(products.message);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const updateProduct = async (req, res) => {
  if (req.userType === "cliente") {
    const { id } = req.params;

    try {
      if (!id) {
        throw new Error("Id is required");
      }

      const updatedProduct = await productModel.updateProduct(
        id,
        req.body,
        req.userId
      );

      if (updatedProduct.error) {
        throw new Error(updatedProduct.error);
      }
      res.status(200).json({
        data: updatedProduct,
        message: "Product updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

const deleteProduct = async (req, res) => {
  if (req.userType === "cliente") {
    const { id } = req.params;

    try {
      if (!id) {
        throw new Error("Id is required");
      }

      const deletedProduct = await productModel.deleteProduct(id);

      if(deletedProduct.error){
        throw new Error(deletedProduct.error);
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};

export default {
  getProducts,
  getProduct,
  addProducts,
  updateProduct,
  deleteProduct,
};
