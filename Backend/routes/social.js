// backend/routes/social.js
import express from "express";
import { getCachedResponse, setCachedResponse } from "../utils/cache.js";

const router = express.Router();

// GET /social/:id/social-media (mock version)
router.get("/:id/social-media", async (req, res) => {
  const { id } = req.params;
  const cacheKey = `social:${id}`;
  const cached = await getCachedResponse(cacheKey);
  if (cached) return res.json(cached);

  // Mock Data
  const socialPosts = [
    { user: "citizen1", post: "#floodrelief Need food in NYC", timestamp: new Date().toISOString() },
    { user: "helper42", post: "#earthquake Volunteers available in LA", timestamp: new Date().toISOString() },
  ];

  await setCachedResponse(cacheKey, socialPosts);
  req.io.emit("social_media_updated", { disaster_id: id });
  res.json(socialPosts);
});

export default router;
