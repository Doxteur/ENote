import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
const config = process.env;

export default (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }
  return verify(token, config.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(500).json({
        auth: false,
        message: "Failed to authenticate token.",
      });
    }
    // update database
    const prisma = new PrismaClient();
    await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        token: token,
      },
    });

    req.userId = decoded.id;
    return next();
  });
};
