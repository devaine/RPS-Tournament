import { io } from "socket.io-client";

// NOTE: URL to connec to SocketIO backend, not frontend port
const URL = import.meta.env.DEV_URL || import.meta.env.PROD_URL || "http://localhost:3002";

const socket = io(URL, {
	autoConnect: true,
});

if (socket.connected) {
	console.log("socketio connected!")
}

export { socket };
