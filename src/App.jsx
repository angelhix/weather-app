import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const weatherIconMap = {
  "clear-day": "☀️",
  "clear-night": "🌙",
  "partly-cloudy-day": "⛅",
  "partly-cloudy-night": "🌥️",
  "cloudy": "☁️",
  "fog": "🌫️",
  "wind": "💨",
  "rain": "🌧️",
  "snow": "❄️",
  "thunder-rain": "⛈️",
  "thunder": "🌩️",
  "sleet": "🌨️",
  "hail": "🌨️",
};

const getWeatherEmoji = (icon) => weatherIconMap[icon] || "🌡️";

const getTheme = (condition, temp) => {
  if (!condition) return { bg: "#0a0f1e", accent: "#3b82f6" };
  const c = condition.toLowerCase();
  if (c.includes("pluie") || c.includes("orage")) return { bg: "#0d1117", accent: "#60a5fa" };
  if (c.includes("neige"))                         return { bg: "#0f1729", accent: "#a5b4fc" };
  if (c.includes("nuage") || c.includes("couvert"))return { bg: "#111827", accent: "#94a3b8" };
  if (c.includes("soleil") || c.includes("clair") || c.includes("ensoleillé"))
                                                   return { bg: "#0c1a0f", accent: "#fbbf24" };
  if (temp > 30)                                   return { bg: "#1a0c0c", accent: "#f97316" };
  return { bg: "#0a0f1e", accent: "#38bdf8" };
};

const formatHour = (datetime) => {
  const hour = parseInt(datetime.split(":")[0]);
  return hour === 0 ? "00h" : `${hour}h`;
};

const formatDay = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" });
};

/* ─── ICONS ─── */

const WindIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
  </svg>
);

const DropIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const ThermometerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>
);

/* ─── APP ─── */

export default function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather]   = useState(null);
  const [hourly, setHourly]     = useState([]);
  const [daily, setDaily]       = useState([]);
  const [loading, setLoading]   = useState(false);
  const [cityName, setCityName] = useState("");
  const [theme, setTheme]       = useState({ bg: "#0a0f1e", accent: "#3b82f6" });

  const apiKey = "LJ9LNYSAPJ3URWAFQANDHUFU7";

  const fetchWeather = async () => {
    if (!location.trim()) return;
    setLoading(true);

    const url =
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
      `${encodeURIComponent(location)}?unitGroup=metric&include=current,hours,days` +
      `&key=${apiKey}&contentType=json&lang=fr`;

    try {
    const response = await fetch(url);
      if (!response.ok) throw new Error("Erreur API");

     const data = await response.json();

     // Vérification supplémentaire
    if (!data.resolvedAddress || !data.currentConditions) {
    throw new Error("Ville invalide");
    }

    // Optionnel : vérifier si la ville correspond réellement
     if (!data.resolvedAddress.toLowerCase().includes(location.toLowerCase().split(",")[0])) {
    throw new Error("Ville approximative");
    }

      setWeather(data.currentConditions);
      setHourly(data.days?.[0]?.hours?.slice(0, 24) || []);
      setDaily(data.days?.slice(0, 7) || []);
      setCityName(data.resolvedAddress?.split(",")[0] || location);
      setTheme(
      getTheme(
      data.currentConditions?.conditions,
      data.currentConditions?.temp
    )
     );

     } catch (error) {
     console.error(error);
     alert("Localisation introuvable. Vérifiez l’orthographe.");
      }

    setLoading(false);
  };

  const handleKey = (e) => e.key === "Enter" && fetchWeather();
  const currentHour = new Date().getHours();

  /* Only dynamic values (theme colors) are passed as CSS variables on the root */
  const cssVars = {
    "--bg": theme.bg,
    "--accent": theme.accent,
  };

  return (
    <div className="app" style={cssVars}>

      {/* HEADER */}
      <div className="header">
        <div className="brand">Ashraf<span>Meteore</span></div>
        {weather && (
          <motion.div
            className="header-date"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </motion.div>
        )}
      </div>

      {/* SEARCH */}
      <div className="search-wrapper">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Paris, Tokyo, New York…"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="search-btn" onClick={fetchWeather}>
            <SearchIcon />
            Rechercher
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading-dots">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      )}

      {/* EMPTY STATE */}
      {!weather && !loading && (
        <div className="empty-state">
          <div className="empty-globe">🌍</div>
          <div className="empty-title">Où êtes-vous ?</div>
          <div className="empty-sub">Entrez une ville pour voir la météo en temps réel</div>
        </div>
      )}

      {/* WEATHER DATA */}
      <AnimatePresence>
        {weather && !loading && (
          <>
            {/* MAIN CARDS */}
            <motion.div
              className="main-grid"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Current temperature */}
              <div className="glass-card current-card">
                <div className="city-name">{cityName}</div>
                <div className="temp-display">
                  {Math.round(weather.temp)}<sup>°C</sup>
                </div>
                <div className="condition-text">{weather.conditions}</div>
                <div className="feels-like">
                  <ThermometerIcon />
                  Ressenti {Math.round(weather.feelslike)}°
                </div>
              </div>

              {/* Stats */}
              <div className="details-card">
                <div className="stat-item">
                  <div className="stat-label"><WindIcon /> Vent</div>
                  <div className="stat-value">
                    {Math.round(weather.windspeed)}<span>km/h</span>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: `${Math.min(weather.windspeed, 100)}%` }} />
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-label"><DropIcon /> Précipitations</div>
                  <div className="stat-value">
                    {weather.precipprob}<span>%</span>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: `${weather.precipprob}%` }} />
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-label">💧 Humidité</div>
                  <div className="stat-value">
                    {Math.round(weather.humidity)}<span>%</span>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: `${weather.humidity}%` }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* HOURLY */}
            {hourly.length > 0 && (
              <motion.div
                className="section-wrap"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="section-title">Aujourd'hui — heure par heure</div>
                <div className="hourly-scroll">
                  {hourly.map((hour, i) => {
                    const h = parseInt(hour.datetime.split(":")[0]);
                    const isCurrent = h === currentHour;
                    return (
                      <motion.div
                        key={i}
                        className={`hour-pill${isCurrent ? " current" : ""}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.025 }}
                      >
                        <div className="hour-time">{formatHour(hour.datetime)}</div>
                        <div className="hour-emoji">{getWeatherEmoji(hour.icon)}</div>
                        <div className="hour-temp">{Math.round(hour.temp)}°</div>
                        {hour.precipprob > 20 && (
                          <div className="hour-rain">{hour.precipprob}%</div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* DAILY */}
            {daily.length > 0 && (
              <motion.div
                className="section-wrap"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="section-title">7 prochains jours</div>
                <div className="daily-grid">
                  {daily.map((day, i) => (
                    <motion.div
                      key={i}
                      className={`day-card${i === 0 ? " today" : ""}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <div className="day-name">
                        {i === 0 ? "Auj." : formatDay(day.datetime).split(" ")[0]}
                      </div>
                      <div className="day-emoji">{getWeatherEmoji(day.icon)}</div>
                      <div className="day-temps">
                        <div className="temp-max">{Math.round(day.tempmax)}°</div>
                        <div className="temp-min">{Math.round(day.tempmin)}°</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}