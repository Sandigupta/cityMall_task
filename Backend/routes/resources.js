// backend/routes/resources.js
import express from "express";
import supabase from "../utils/supabaseClient.js";
import { logAction } from "../utils/logger.js";

const router = express.Router();

// GET /resources?lat=...&lon=...
router.get("/", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "lat and lon are required" });

  try {
    const { data, error } = await supabase.rpc("get_nearby_resources", {
      lat_input: parseFloat(lat),
      lon_input: parseFloat(lon),
      radius_m: 10000, // 10km radius
    });

    if (error) return res.status(500).json({ error });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Supabase geospatial query failed" });
  }
});



export default router;