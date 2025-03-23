import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import helmet from "helmet";

const PORT = 3001;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(helmet(), express.json());

app.get("/", (req, res) => {
  res.json("hello");
});

io.on("connection", (socket) => {
  console.log("a user connected!");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
