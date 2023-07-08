import { Router as router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/NoteControllers.js";
import {
  updateDemande,
  createDemande,
} from "../controllers/DemandeController.js";

const prisma = new PrismaClient();

export default router()
  .get("/", async (req, res) => {
    const notes = await getNotes(req, res);
    res.json(notes);
  })
  .post("/", async (req, res) => {
    try {
      const note = await createDemande(req, res);
      res.json(note);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message});
    }
  })
  .put("/:id", async (req, res) => {
    const note = await updateDemande(req, res);
    res.json(note);
  })
  .delete("/:id", async (req, res) => {
    const note = await deleteNote(req, res);
    res.json(note);
  });
