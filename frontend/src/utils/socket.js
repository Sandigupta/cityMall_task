// utils/socket.js
import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // Backend socket server
const socket = io(process.env.VITE_SOCKET_URL || "http://localhost:5000");
export default socket;
