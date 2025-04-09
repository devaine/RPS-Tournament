import { io } from "socket.io-client";

const PORT = 3001;
const URL = "http://localhost:" + PORT;
// const URL = "http://10.162.167.86:" + PORT; // For LSC testing

const socket = io(URL, {
  autoConnect: false,
});

export { socket };
