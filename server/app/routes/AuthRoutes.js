import { Router as router } from "express";
import { PrismaClient } from "@prisma/client";

export default router()
.get("/", (req, res) => {
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
});
