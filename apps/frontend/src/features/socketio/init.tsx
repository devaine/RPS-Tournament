import { io } from "socket.io-client";

const URL = "https://rps-dev.devdoes.work";
// const URL = "http://10.162.167.86:" + PORT; // For LSC testing

const socket = io(URL, {
  autoConnect: false,
});

export { socket };
