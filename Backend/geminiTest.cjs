const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("🔑 GEMINI_API_KEY:", GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌");

async function testGemini() {
  try {
    const prompt = "Extract location from: Heavy floods in Chennai";
    console.log("📝 Prompt:", prompt);

    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro-latest:generateContent";
    console.log("🌐 Endpoint:", url);

    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
    };
    console.log("📦 Request Body:", JSON.stringify(requestBody, null, 2));

    const config = {
      params: { key: GEMINI_API_KEY },
      headers: { "Content-Type": "application/json" },
    };
    console.log("⚙️ Config:", config);

    const response = await axios.post(url, requestBody, config);
    console.log("✅ Gemini Raw Response:", JSON.stringify(response.data, null, 2));

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    console.log("✅ Final Extracted Response:", result);
  } catch (err) {
    console.error("❌ Gemini Error:", err.response?.data || err.message);
  }
}

testGemini();
