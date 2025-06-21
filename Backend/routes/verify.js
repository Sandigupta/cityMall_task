// backend/routes/verify.js
import express from "express";
import axios from "axios";
import { getCachedResponse, setCachedResponse } from "../utils/cache.js";

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// POST /verify/:id/verify-image
router.post("/:id/verify-image", async (req, res) => {
  const { id } = req.params;
  const { image_url } = req.body;

  if (!image_url) {
    return res.status(400).json({ error: "❗ image_url is required" });
  }

  const cacheKey = `verify:${id}:${image_url}`;
  const cached = await getCachedResponse(cacheKey);
  if (cached) {
    console.log(`⚡ Cache hit for ${cacheKey}`);
    return res.json(cached);
  }

  try {
    const prompt = `Analyze the following image for authenticity or signs of disaster: ${image_url}`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        params: { key: GEMINI_API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    const result =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!result) {
      return res
        .status(500)
        .json({ error: "❌ Gemini API returned no usable result." });
    }

    // Cache and return
    await setCachedResponse(cacheKey, { result });
    res.json({ result });
  } catch (error) {
    console.error("❌ Gemini Error:", error?.response?.data || error.message);
    res.status(500).json({
      error: "Failed to verify image",
      details: error?.response?.data?.error?.message || error.message,
    });
  }
});

// GET /verify/test-api
router.get("/test-api", async (req, res) => {
  try {
    const prompt = "What is the capital of India?";
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        params: { key: GEMINI_API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    const result =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    res.json({ success: true, result });
  } catch (error) {
    console.error("❌ API Test Failed:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error?.response?.data?.error?.message || error.message,
    });
  }
});

export default router;
