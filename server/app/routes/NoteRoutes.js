import { Router as router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/NoteControllers.js";

const prisma = new PrismaClient();

export default router()
  .get("/", async (req, res) => {
    try {
      const notes = await getNotes(req, res);
      res.json(notes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post("/", async (req, res) => {
    const note = await createNote(req, res);
    res.json(note);
  })
  .put("/:id", async (req, res) => {
    const note = await updateNote(req, res);
    res.json(note);
  })
  .delete("/:id", async (req, res) => {
    const note = await deleteNote(req, res);
    res.json(note);
  });
