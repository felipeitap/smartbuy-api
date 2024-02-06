import { verifyToken } from "../../config/jwt";

const autenticateToken = (req, res, next) => {
  const authorization = req.header("authorization");

  if (!authorization) {
    res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authorization.split(" ")[1];
    verifyToken(token);
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: error });
  }
};

export default autenticateToken;
