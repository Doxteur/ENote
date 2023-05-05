import { Router as router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default router()
  .get("/user", (req, res) => {
    Promise.resolve()
      .then(async () => {
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany();
        !users && res.status(404).send("Not found");
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  })
  .get("/useradd", (req, res) => {
    Promise.resolve()
      .then(async () => {
        const prisma = new PrismaClient();
        const password = await bcrypt.hash("test", 8);

        const users = await prisma.user.create({
          data: {
            name: "Alice",
            email: "test@gmail.com",
            password: password,
            name: "Alice",
          },
        });
        console.log(users);
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });
