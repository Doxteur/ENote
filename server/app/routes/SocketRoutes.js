import { Router as router } from "express";
import io from "../../App.js";

export default router().get("/:id", async (req, res) => {
  io.once("connection", (socket) => {
    console.log("connected");
    const room = req.params.id;
    socket.join(room);
    socket.emit("connected", `You are connected to room ${room}`);
    socket.on("editing", (data) => {
      socket.broadcast.to(room).emit("editing", data);
    });

    socket.on("disconnect", () => {
      socket.broadcast
        .to(room)
        .emit("disconnected", "Someone has disconnected");
      socket.leave(room);
    });
  });

  res.json({ message: "Connected" });
});
