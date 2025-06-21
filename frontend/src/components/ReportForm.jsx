'use client'
import { useState } from "react";

export default function ReportForm() {
  const [form, setForm] = useState({
    content: "",
    image_url: "",
  });

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-2">Submit a Report</h2>
      <textarea
        placeholder="Report content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={form.image_url}
        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        className="border p-2 w-full"
      />
      <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
}
