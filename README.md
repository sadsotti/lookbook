# 👕 LookBook | Smart Pricing AI

LookBook is an AI-powered full-stack web application designed to help users evaluate their second-hand clothing. By analyzing a photo and basic metadata (brand, category, condition), the app provides an estimated market value, a pricing range, and customized selling tips.

This project was developed for the **AI Agents for Development** course at **start2impact**.

---

## ✨ Key Features

- **AI Vision Analysis:** Utilizes Google's Gemini 2.5 Flash to visually inspect clothing items.
- **Smart Appraisals:** Generates suggested prices, minimum/maximum ranges, and detailed motivations based on market trends.
- **Personalized Selling Tips:** Offers actionable advice to maximize the selling potential of each specific item.
- **Persistent Wardrobe:** Saves all user evaluations securely in a cloud database (MongoDB Atlas).
- **Responsive UI:** Built with React and Tailwind CSS for a seamless experience on both desktop and mobile.

---

## 📂 Project Structure
```
lookbook/
├── frontend/               # React + Vite Client
│   ├── dist/               # Production build (deployed)
│   └── src/
│       ├── components/     # UI Modules
│       └── App.jsx         # Main logic & AI integration
│
└── backend/                # Node.js Serverless Functions
    ├── models/             # Mongoose Schemas
    └── server.js           # Express logic & Gemini SDK
```

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Hosting:** Netlify

### Backend
- **Runtime:** Node.js (Express)
- **AI Engine:** Google Gemini 2.5 Flash
- **Serverless Wrapper:** `serverless-http` for Netlify Functions

### Database
- **Provider:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose
- **Structure:** Persistent storage for user evaluations, indexed by `userId`

---

## 🚀 Live Demo

The application is fully deployed and hosted on Netlify:

👉 **[Live Demo](https://lookbook-s2i.netlify.app/)**

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/sadsotti/lookbook.git
cd lookbook
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
API_KEY=your_gemini_api_key
```

Run locally:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173`.

---

## ☁️ Deployment (Netlify Configuration)

The project is configured via `netlify.toml` for automatic deployment:

| Setting | Value |
|---|---|
| Build Command | `npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend` |
| Publish Directory | `frontend/dist` |
| Functions Directory | `backend` |

The backend is exposed as a serverless function at `/.netlify/functions/server`, with all `/api/*` traffic automatically redirected for a clean API experience.

---

## 🔗 Useful Links

- **start2impact:** [https://www.start2impact.it/](https://www.start2impact.it/)
- **My LinkedIn:** [https://www.linkedin.com/in/lorenzo-sottile/](https://www.linkedin.com/in/lorenzo-sottile/)

---