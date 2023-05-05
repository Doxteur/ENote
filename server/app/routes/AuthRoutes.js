import { Router as router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { signToken } from "../utils/authUtils.js";

const prisma = new PrismaClient();

export default router()
  .post("/login", async (req, res) => {
    console.log("req.body", req.body);
    try {
      if (!req.body?.email || !req.body?.password) {
        return res.status(400).json({ message: "Missing email or password" });
      }
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        return res.status(200).json({ error: "L'utilisateur n'éxiste pas" });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(200).json({ error: "Mauvais mot de passe" });
      }
      const token = signToken(user);

      res.json({
        user,
        message: "Utilisateur connecté avec succès",
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .post("/register", async (req, res) => {
    try {
      if (!req.body?.email || !req.body?.password) {
        return res.status(400).json({ message: "Missing email or password" });
      }
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        return res.status(409).json({ message: "User already exists" });
      }
      const newUser = await prisma.user.create({
        data: {
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        },
      });
      const token = signToken(newUser);

      res.json({
        user,
        message: "Utilisateur créé avec succès",
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
