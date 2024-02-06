import userModel from "../models/user_model";

const getUsers = async (req, res) => {
  const users = await userModel.getAll();
  if (!users.severity) {
    res.status(200).json({ data: users });
  } else {
    res.status(500).json({ error: users.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const users = await userModel.getOne(id);

  if (!users.severity) {
    if (users.length > 0) {
      res.status(200).json({ data: users });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(500).json({ error: users.message });
  }
};


const updatedUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userModel.updateUser(id, req.body);

  if (!id) {
    res.status(400).json({ error: "Id is a required" });
  }

  if (!updatedUser.severity) {
    res
      .status(200)
      .json({ data: updatedUser, message: "User updated successfully " });
  } else {
    res.status(500).json({ error: updatedUser.message });
  }
};

const deletedUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await userModel.deleteUser(id);

  if (!id) {
    res.status(400).json({ error: "Id is a required" });
  }

  if (!deletedUser.severity) {
    res.status(200).json({ message: "User deleted successfully " });
  } else {
    res.status(500).json({ error: deletedUser.message });
  }
};

export default {
  getUsers,
  getUser,
  updatedUser,
  deletedUser,
};
