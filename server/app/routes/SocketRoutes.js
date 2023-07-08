import { Router as router } from "express";
import io from "../../App.js";

export default router().get("/:id", async (req, res) => {

  res.json({ message: "Connected" });
});
