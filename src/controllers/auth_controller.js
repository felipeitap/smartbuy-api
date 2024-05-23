import authModel from "../models/auth_model";
import userModel from "../models/user_model";
import { genereateToken } from "../config/jwt";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { password, username } = req.body;
  const hash = await authModel.getHash(req.body);

  if (!hash.severity) {
    bcrypt.compare(password, hash, async (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      }

      if (result) {
        const auth = await authModel.getOneByUserName(username);
        const user = await userModel.getOneFromAuth(auth.id);
        
        const userType = user.tipo_usuario;
        const userId = user.user_id;

        const token = genereateToken({ userId, userType });
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    });
  } else {
    res.status(500).json({ error: hash.message });
  }
};

const newAuth = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(12);

  await bcrypt.hash(password, salt, async (err, hash) => {
    if (err) {
      console.error("Error during genereate hash: ", err);
      res.status(500).json({ error: err });
    }

    const auth = await authModel.addAuth({ username, password: hash });

    if (!auth.severity) {
      const newUser = await userModel.addUser({ ...req.body, authId: auth });

      if (!newUser.severity) {
        res.status(200).json({ message: "Acount created successfuly" });
      } else {
        res.status(500).json({ error: newUser.message });
      }
    } else {
      res.status(500).json({ error: auth.message });
    }
  });
};

export default {
  login,
  newAuth,
};
