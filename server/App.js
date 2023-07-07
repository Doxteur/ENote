import express from "express";
import index from "./app/routes/index.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(express.json());

//
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://localhost:4001"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("join", (room) => {
    console.log(`A user joined room ${room}`);
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
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  }
  );
});

app.use("/api", index);

server.listen(port, () => console.log(`Listening on port ${port}`));

export default io;
