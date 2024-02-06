import jwt from "jsonwebtoken";

import { randomBytes } from "crypto";

const secretKey = genereateHAMC();

function genereateHAMC() {
  return randomBytes(32).toString("hex");
}

function genereateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

export { genereateToken, verifyToken };
