import { Router as router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default router()
  .get("/", async (req, res) => {
    const prisma = new PrismaClient();
    const notes = await prisma.note.findMany();
    res.json(notes);
  })
  .post("/", async (req, res) => {
    const prisma = new PrismaClient();
    const { title, content } = req.body;
    const note = await prisma.note.create({
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
    const note = await prisma.note.update({
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
    const note = await prisma.note.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(note);
  })

  

  
