import { Router as router } from "express";
import { PrismaClient } from "@prisma/client";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/NoteControllers.js";
import { updateDemande } from "../controllers/DemandeController.js";

const prisma = new PrismaClient();

export default router()
  .get("/", async (req, res) => {
    const notes = await getNotes(req, res);
    res.json(notes);
  })
  .post("/", async (req, res) => {
    const note = await createNote(req, res);
    res.json(note);
  })
  .put("/:id", async (req, res) => {
    const note = await updateDemande(req, res);
    res.json(note);
  })
  .delete("/:id", async (req, res) => {
    const note = await deleteNote(req, res);
    res.json(note);
  });
