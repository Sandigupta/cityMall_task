// backend/routes/geocode.js
import express from "express";
import supabase from "../utils/supabaseClient.js";
import { getCachedResponse, setCachedResponse } from "../utils/cache.js";
import axios from "axios";

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_MAPS_KEY = process.env.MAPBOX_TOKEN; // This is your Google Maps key
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// POST /geocode
router.post("/", async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: "❗ description is required" });
  }

  const cacheKey = `geocode:${description}`;
  const cached = await getCachedResponse(cacheKey);
  if (cached) {
    console.log(`⚡ Cache hit for ${cacheKey}`);
    return res.json(cached);
  }

  try {
    // Step 1: Gemini - extract location
    const prompt = `Extract the location name from this sentence:\n"${description}". Return only the location name, no extra text.`;

    const geminiRes = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        params: { key: GEMINI_API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    let locationName = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    console.log("📍 Gemini extracted location:", locationName);

    if (!locationName || locationName.length < 3) {
      console.warn("⚠️ Invalid Gemini location, falling back to description");
      locationName = description;
    }

    // Step 2: Google Maps Geocoding
    const mapsRes = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: locationName,
        key: GOOGLE_MAPS_KEY,
      },
    });
    console.log("🗺️ Google Maps Full Response:", mapsRes.data);
    const coords = mapsRes.data?.results?.[0]?.geometry?.location;
    console.log("📌 Google Maps coordinates:", coords);

    if (!coords) {
      return res.status(500).json({ error: "❌ Google Maps failed to geocode location" });
    }

    const result = {
      location_name: locationName,
      lat: coords.lat,
      lon: coords.lng,
    };

    await setCachedResponse(cacheKey, result);
    res.json(result);
  } catch (err) {
    console.error("❌ Geocode Error:", err?.response?.data || err.message);
    res.status(500).json({
      error: "Internal Server Error",
      details: err?.response?.data?.error?.message || err.message,
    });
  }
});

export default router;
