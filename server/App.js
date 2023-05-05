import express from "express";
import { createServer } from "http";
// import socketIo from "socket.io";
import index from "./app/routes/index.js";

const port = process.env.PORT || 4001;

const app = express();
app.use(index);

const server = createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));
// const io = socketIo(server); // < Interesting!

const getApiAndEmit = "TODO";
