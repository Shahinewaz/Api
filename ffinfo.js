// Node.js / Vercel Serverless API
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { uid } = req.method === "GET" ? req.query : req.body;

  if (!uid) return res.status(400).json({ error: "UID missing" });

  try {
    const targetUrl = `https://gameskinbo.com/api/free_fire_id_checker?uid=${uid}`;
    const response = await fetch(targetUrl, {
      headers: {
        "Referer": "https://gameskinbo.com/",
        "User-Agent": "Mozilla/5.0 (Linux; Android 11; vivo 1906)",
        "Accept": "application/json, text/plain, */*",
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    const text = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}