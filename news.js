import fetch from "node-fetch";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ message: "OK" });
  }

  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "API key is missing on server",
      });
    }

    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&category=business&language=en`
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({
        success: false,
        message: error?.message || "API request failed",
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
