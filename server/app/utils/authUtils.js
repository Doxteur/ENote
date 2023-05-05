import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const config = process.env;



export function signToken(user) {
  const token = jwt.sign({ id: user.id }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: 86400, // 24 hours
  });
  return token;
};
