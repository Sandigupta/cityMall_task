"use client";
import { useState } from "react";
import api from "@/utils/axios";
import { v4 as uuidv4 } from "uuid";

export default function NewDisasterForm() {
  const [form, setForm] = useState({
    title: "",
    location_name: "",
    description: "",
    tags: "",
    owner_id: "netrunnerX",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
      };
      const res = await api.post("/disasters", payload);
      alert("Disaster created!");
    } catch (err) {
      console.error("Error creating disaster:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6 border"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center">
          🌪️ Report New Disaster
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            placeholder="e.g. Flood in Assam"
            onChange={handleChange}
            value={form.title}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Location
          </label>
          <input
            name="location_name"
            placeholder="e.g. Guwahati"
            onChange={handleChange}
            value={form.location_name}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Provide details about the disaster..."
            onChange={handleChange}
            value={form.description}
            className="w-full px-4 py-2 border rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Tags <span className="text-xs text-gray-500">(comma separated)</span>
          </label>
          <input
            name="tags"
            placeholder="e.g. flood, emergency, northeast"
            onChange={handleChange}
            value={form.tags}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition-all duration-200"
        >
          Submit Disaster Report
        </button>
      </form>
    </div>
  );
}
