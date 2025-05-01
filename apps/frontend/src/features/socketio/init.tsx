import { io } from "socket.io-client";
import dotenv from "dotenv"
dotenv.config({ path: ["../../../../../.env"] });

// NOTE: URL to connec to SocketIO backend, not frontend port
const URL =
	process.env.DEV_URL || process.env.PROD_URL || "http://localhost:3000";

const socket = io(URL, {
	autoConnect: false,
});

export { socket };
