// utils/socket.js
import { io } from "socket.io-client";

const socket = io("https://citymall-task-3.onrender.com"); // Backend socket server

export default socket;
