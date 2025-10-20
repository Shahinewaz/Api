import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/ffinfo", async (req, res) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ error: "UID missing" });

  try {
    const response = await fetch(`https://gameskinbo.com/api/free_fire_id_checker?uid=${uid}`, {
      headers: {
        "Referer": "https://gameskinbo.com/",
        "User-Agent": "Mozilla/5.0 (Linux; Android 11; vivo 1906)",
        "Accept": "application/json, text/plain, */*",
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    const text = await response.text();
    try {
      res.json(JSON.parse(text));
    } catch (err) {
      console.error("JSON parse error:", err);
      res.status(500).json({ error: "Failed to parse API response" });
    }
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
