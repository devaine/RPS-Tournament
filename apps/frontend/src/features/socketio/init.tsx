import { io } from "socket.io-client";

const URL = "https://rps.devdoes.work";
//const URL = "http://localhost:3002"

const socket = io(URL, {
  autoConnect: false,
});

export { socket };
