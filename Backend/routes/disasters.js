// backend/routes/disasters.js
import express from "express";
import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/supabaseClient.js";
import { logAction } from "../utils/logger.js";

const router = express.Router();

// POST /disasters - Create a new disaster
router.post("/", async (req, res) => {
  const { title, location_name, description, tags, owner_id } = req.body;
  const id = uuidv4();
  const created_at = new Date().toISOString();
  const audit = [{ action: "create", user_id: owner_id, timestamp: created_at }];

  const { error } = await supabase.from("disasters").insert([
    { id, title, location_name, description, tags, owner_id, created_at, audit_trail: audit },
  ]);

  if (error) return res.status(500).json({ error });
  req.io.emit("disaster_updated", { id, title });
  logAction(`Disaster created: ${title}`);
  res.status(201).json({ id });
});

// GET /disasters?tag=
router.get("/", async (req, res) => {
  const { tag } = req.query;
  let query = supabase.from("disasters").select("*").order("created_at", { ascending: false });
  if (tag) query = query.contains("tags", [tag]);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// PUT /disasters/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, location_name, description, tags, user_id } = req.body;

  const updateData = {
    title,
    location_name,
    description,
    tags,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("disasters").update(updateData).eq("id", id);
  if (error) return res.status(500).json({ error });

  req.io.emit("disaster_updated", { id });
  logAction(`Disaster updated: ${title}`);
  res.json({ message: "Disaster updated" });
});

// GET /disasters/:id - Get a disaster by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("disasters")
    .select("*")
    .eq("id", id)
    .single(); // ensures one object is returned instead of an array

  if (error || !data) {
    return res.status(404).json({ error: "Disaster not found" });
  }

  res.json(data);
});


// DELETE /disasters/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("disasters").delete().eq("id", id);
  if (error) return res.status(500).json({ error });
  req.io.emit("disaster_updated", { id });
  logAction(`Disaster deleted: ${id}`);
  res.json({ message: "Disaster deleted" });
});

export default router;