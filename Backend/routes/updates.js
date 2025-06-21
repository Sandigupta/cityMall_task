// backend/routes/updates.js
import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { getCachedResponse, setCachedResponse } from "../utils/cache.js";

const router = express.Router();

// GET /updates/:id/official-updates
router.get("/:id/official-updates", async (req, res) => {
  const { id } = req.params;
  const cacheKey = `updates:${id}`;
  const cached = await getCachedResponse(cacheKey);
  if (cached) return res.json(cached);

  try {
    const urls = [
      "https://www.fema.gov/press-release", // Sample URL
      "https://www.redcross.org/about-us/news-and-events/press.html"
    ];

    let allUpdates = [];
    for (const url of urls) {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);
      const items = [];

      $("a").each((i, el) => {
        const text = $(el).text().trim();
        const link = $(el).attr("href");
        if (text && link && link.startsWith("http")) {
          items.push({ title: text, link });
        }
      });

      allUpdates = allUpdates.concat(items.slice(0, 5)); // Take top 5 from each
    }

    await setCachedResponse(cacheKey, allUpdates);
    res.json(allUpdates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch official updates", details: error.message });
  }
});

export default router;