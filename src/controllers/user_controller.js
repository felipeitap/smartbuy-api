import userModel from "../models/user_model";

const getUsers = async (req, res) => {
  const users = await userModel.getAll();
  if (!users.severity) {
    res.status(200).json({ data: users });
  } else {
    res.status(500).json({ error: users.message });
  }
};

const newUser = async (req, res) => {
  const newUser = await userModel.addUser(req.body);

  if (!newUser.severity) {
    res
      .status(201)
      .json({ data: newUser, message: "User created successfully " });
  } else {
    res.status(500).json({ error: newUser.message });
  }
};

const updatedUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userModel.updateUser(id, req.body);

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

  if (!deletedUser.severity) {
    res
      .status(200)
      .json({ message: "User deleted successfully " });
  } else {
    res.status(500).json({ error: deletedUser.message });
  }
};

export default {
  getUsers,
  newUser,
  updatedUser,
  deletedUser,
};
