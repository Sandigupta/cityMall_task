// backend/index.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import disasterRoutes from "./routes/disasters.js";
import geocodeRoutes from "./routes/geocode.js";
import socialRoutes from "./routes/social.js";
import updatesRoutes from "./routes/updates.js";
import verifyRoutes from "./routes/verify.js";
import resourceRoutes from "./routes/resources.js";
import rateLimiter from './middleware/rateLimiter.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});



app.use(cors());
app.use(express.json());
app.use(rateLimiter); // applies to all routes

app.use(morgan("dev"));
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await import("./utils/supabaseClient.js").then(m =>
      m.default.from("disasters").select("*").limit(1)
    );

    if (error) return res.status(500).json({ connected: false, error });

    res.json({ connected: true, data });
  } catch (err) {
    res.status(500).json({ connected: false, message: err.message });
  }
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Client connected");
});

// Middleware to pass io to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API Routes
app.use("/disasters", disasterRoutes);
app.use("/geocode", geocodeRoutes);
app.use("/social", socialRoutes);
app.use("/updates", updatesRoutes);
app.use("/verify", verifyRoutes);
app.use("/resources", resourceRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
