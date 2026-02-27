const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const apiKey = "TA_CLE_SECRETE";

app.get("/meteo", async (req, res) => {
  const location = req.query.location;

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&include=current,hours,days&key=${apiKey}&contentType=json&lang=fr`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(3001, () => {
  console.log("Serveur lancé sur http://localhost:3001");
});