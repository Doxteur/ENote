import express from "express";
import index from "./app/routes/index.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(express.json());


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://localhost:4001"],
  },
});

app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use("/api", index);


server.listen(port, () => console.log(`Listening on port ${port}`));

export default io;
