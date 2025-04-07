import { io } from "socket.io-client";

const PORT = 3001;
const URL = "http://localhost:" + PORT;

const socket = io(URL, {
  autoConnect: false,
});

export { socket };
