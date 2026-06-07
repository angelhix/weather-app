# 🌤️ Weather App

Une application météo moderne et élégante construite avec **React** et **Vite**, intégrant l'API Visual Crossing pour fournir des données météorologiques en temps réel.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Caractéristiques](#caractéristiques)
- [Stack technique](#stack-technique)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Architecture du projet](#architecture-du-projet)
- [API Visual Crossing](#api-visual-crossing)
- [Personnalisation](#personnalisation)
- [Déploiement](#déploiement)
- [Dépannage](#dépannage)
- [Licence](#licence)

## 🎯 Aperçu

**Weather App** est une application de prévisions météorologiques interactive qui permet aux utilisateurs de rechercher la météo de n'importe quelle ville dans le monde. L'application offre une interface utilisateur élégante avec design **glassmorphism**, animations fluides et adaptation responsive pour tous les appareils.

### Fonctionnalités principales :
- 🔍 Recherche de localisation en temps réel
- 🌡️ Température actuelle et conditions météorologiques
- 📊 Données détaillées (vitesse du vent, humidité, probabilité de précipitations)
- ⏰ Prévisions horaires (24 heures)
- 📅 Prévisions sur 7 jours
- 🎨 Thème dynamique selon les conditions météorologiques
- 📱 Design responsive (mobile, tablet, desktop)
- ⚡ Animations fluides avec Framer Motion

## ✨ Caractéristiques

### Interface utilisateur
- **Design Glassmorphism** : Interface moderne avec effets de verre dépoli
- **Thème dynamique** : Les couleurs s'adaptent selon les conditions météorologiques
- **Animations fluides** : Transitions élégantes et réactions utilisateur
- **Responsive design** : Fonctionne parfaitement sur tous les appareils

### Données météorologiques
- Température actuelle avec ressenti thermique
- Conditions météorologiques détaillées
- Vitesse du vent avec visualisation de barre
- Taux d'humidité
- Probabilité de précipitations
- Prévisions horaires avec température et probabilité de pluie
- Prévisions sur 7 jours avec températures min/max

### Expérience utilisateur
- Recherche facile par nom de ville
- Messages d'erreur clairs pour les localisations invalides
- État de chargement avec animation
- État vide convivial avant la première recherche

## 🛠️ Stack technique

### Frontend
- **React 19.2** - Bibliothèque UI moderne
- **Vite 7.3** - Build tool ultra-rapide
- **Framer Motion 12.34** - Animations fluides
- **React Leaflet 5.0** - Intégration cartographique (optionnel)
- **Leaflet 1.9** - Bibliothèque de cartographie

### Backend
- **Express.js 5.2** - Serveur Node.js
- **Node-Fetch 3.3** - Client HTTP
- **CORS 2.8** - Gestion des requêtes cross-origin

### Outils de développement
- **ESLint 9.39** - Linting et qualité du code
- **Babel** - Compilation JavaScript
- **npm** - Gestionnaire de paquets

### Langages
- **JavaScript** (55.3%)
- **CSS** (43.3%)
- **HTML** (1.4%)

## 📦 Installation

### Prérequis
- Node.js 18.x ou supérieur
- npm 9.x ou supérieur

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/angelhix/weather-app.git
cd weather-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## ⚙️ Configuration

### Clé API Visual Crossing

1. **Obtenir une clé API**
   - Rendez-vous sur [Visual Crossing](https://www.visualcrossing.com/)
   - Créez un compte gratuit
   - Récupérez votre clé API

2. **Frontend** (`src/App.jsx`)
```javascript
const apiKey = "VOTRE_CLE_API_ICI";
```

3. **Backend** (`src/assets/server.js`)
```javascript
const apiKey = "VOTRE_CLE_API_SECRETE";
```

> ⚠️ **Attention** : Ne commitez jamais votre clé API. Utilisez un fichier `.env` pour la sécurité en production.

### Variables d'environnement

Créez un fichier `.env.local` :
```
VITE_WEATHER_API_KEY=votre_cle_api
VITE_API_URL=http://localhost:3001
```

## 🚀 Utilisation

### Mode développement

```bash
# Lancer l'application Vite
npm run dev

# Dans un autre terminal, lancer le serveur Express (optionnel)
node src/assets/server.js
```

### Build pour la production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`

### Preview de la production

```bash
npm run preview
```

### Linting du code

```bash
npm run lint
```

## 📁 Architecture du projet

```
weather-app/
├── src/
│   ├── assets/
│   │   └── server.js              # Serveur Express (optionnel)
│   ├── App.jsx                    # Composant principal
│   ├── App.css                    # Styles globaux
│   ├── WeatherMap.jsx             # Composant carte (optionnel)
│   ├── index.css                  # Styles de base
│   └── main.jsx                   # Point d'entrée React
├── index.html                     # HTML d'entrée
├── package.json                   # Dépendances et scripts
├── vite.config.js                 # Configuration Vite
├── eslint.config.js               # Configuration ESLint
└── README.md                      # Documentation
```

## 🌐 API Visual Crossing

### Endpoint utilisé

```
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}
```

### Paramètres

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| `location` | string | Nom de la ville à rechercher |
| `unitGroup` | metric | Utilise les unités métriques (°C, km/h) |
| `include` | current,hours,days | Inclut les données actuelles, horaires et quotidiennes |
| `key` | string | Votre clé API Visual Crossing |
| `contentType` | json | Format de réponse JSON |
| `lang` | fr | Langue des réponses en français |

### Réponse API

```json
{
  "resolvedAddress": "Paris, France",
  "currentConditions": {
    "temp": 15.5,
    "feelslike": 14.2,
    "conditions": "Pluie légère",
    "windspeed": 12.5,
    "humidity": 75,
    "precipprob": 60
  },
  "days": [
    {
      "datetime": "2024-06-07",
      "tempmax": 18,
      "tempmin": 12,
      "conditions": "Pluie",
      "icon": "rain"
    }
  ]
}
```

## 🎨 Personnalisation

### Palette de couleurs

Modifiez les variables CSS dans `src/App.css` :

```css
:root {
  --bg: #0a0f1e;              /* Couleur de fond */
  --accent: #3b82f6;          /* Couleur d'accent */
  --glass: rgba(255, 255, 255, 0.055);  /* Fond glassmorphism */
  --text: #f0f4ff;            /* Couleur du texte */
  --text-muted: rgba(240, 244, 255, 0.45);  /* Texte atténué */
}
```

### Thèmes selon les conditions

La fonction `getTheme()` dans `src/App.jsx` définit les couleurs selon la météo :

```javascript
const getTheme = (condition, temp) => {
  if (c.includes("pluie")) return { bg: "#0d1117", accent: "#60a5fa" };
  if (c.includes("neige")) return { bg: "#0f1729", accent: "#a5b4fc" };
  // ...
};
```

### Emojis météorologiques

Personnalisez la map `weatherIconMap` dans `src/App.jsx` :

```javascript
const weatherIconMap = {
  "clear-day": "☀️",
  "clear-night": "🌙",
  "rain": "🌧️",
  // ...
};
```

## 🌍 Déploiement

### Déploiement sur Vercel

```bash
npm install -g vercel
vercel
```

### Déploiement sur Netlify

```bash
npm run build
# Puis uploadez le dossier 'dist/' sur Netlify
```

### Déploiement sur GitHub Pages

Configurez dans `vite.config.js` :

```javascript
export default {
  base: '/weather-app/',
  // ...
}
```

Puis :
```bash
npm run build
```

## 🐛 Dépannage

### Erreur : "Clé API invalide"
- Vérifiez que votre clé API Visual Crossing est correcte
- Assurez-vous qu'elle n'est pas expirée
- Vérifiez votre quota API

### Erreur : "Ville introuvable"
- Vérifiez l'orthographe du nom de la ville
- Utilisez le nom de la ville en anglais ou français
- Essayez avec le format : "Ville, Pays" (ex: "Paris, France")

### Le serveur Express ne démarre pas
- Vérifiez que le port 3001 est disponible
- Assurez-vous que les dépendances sont installées
- Vérifiez les logs d'erreur dans la console

### Les animations ne s'affichent pas
- Vérifiez que Framer Motion est installé : `npm install framer-motion`
- Rafraîchissez la page (Ctrl+Shift+R)
- Vérifiez la console pour les erreurs JavaScript

## 📝 Licence

Ce projet est sous licence ISC.

## 👨‍💻 Auteur

**Ashraf** - [GitHub](https://github.com/angelhix)

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une [issue](https://github.com/angelhix/weather-app/issues).

---

Fait avec ❤️ par [Ashraf](https://github.com/angelhix)
