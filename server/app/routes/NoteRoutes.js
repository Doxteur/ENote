import { Router as router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default router()
  .get("/", async (req, res) => {
    const prisma = new PrismaClient();
    // get token from header
    const token = req.headers.authorization.split(" ")[1];
    // get note for this user
    const notes = await prisma.post.findMany({
      where: {
        author: {
          token,
        },
      },
    });
    res.json(notes);
  })
  .post("/", async (req, res) => {
    const prisma = new PrismaClient();
    const { title, content } = req.body;
    const note = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    res.json(note);
  })
  .put("/:id", async (req, res) => {
    const prisma = new PrismaClient();
    const { title, content } = req.body;
    const note = await prisma.post.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title,
        content,
      },
    });
    res.json(note);
  })
  .delete("/:id", async (req, res) => {
    const prisma = new PrismaClient();
    const note = await prisma.post.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(note);
  });
