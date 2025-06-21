"use client";
import { useState } from "react";
import api from "@/utils/axios";

export default function ImageVerificationForm({ disasterId }) {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await api.post(`/verify/${disasterId}/verify-image`, {
        image_url: imageUrl,
      });

      if (response.data?.result) {
        setResult(response.data.result);
      } else {
        setResult("Gemini API returned no result.");
      }
    } catch (err) {
      console.error("Error verifying image:", err);
      setErrorMsg(err.response?.data?.details || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-6 rounded-xl bg-gradient-to-br from-gray-100 to-blue-50 shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">🕵️‍♂️ Image Verification</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Paste image URL (public HTTPS link)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Image"}
        </button>
      </form>

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMsg}
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-white border rounded-lg shadow">
          <h4 className="font-medium text-gray-700 mb-1">🔍 Result:</h4>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
