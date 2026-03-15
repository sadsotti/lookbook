# 👕 LookBook | Smart Pricing AI

LookBook is an AI-powered full-stack web application designed to help users evaluate their second-hand clothing. By analyzing a photo and basic metadata (brand, category, condition), the app provides an estimated market value, a pricing range, and customized selling tips.

This project was developed for the **AI Agents for Development** course at **start2impact**.

---

## ✨ Key Features

- **AI Vision Analysis:** Utilizes Google's Gemini 2.5 Flash to visually inspect clothing items.
- **Smart Appraisals:** Generates suggested prices, minimum/maximum ranges, and detailed motivations based on market trends.
- **Personalized Selling Tips:** Offers actionable advice to maximize the selling potential of each specific item.
- **Persistent Wardrobe:** Saves all user evaluations securely in a cloud database, acting as a digital inventory.
- **Responsive UI:** Built with React and Tailwind CSS for a seamless experience on both desktop and mobile.

---

## 📂 Project Structure

```
lookbook/
├── frontend/            
│   ├── public/             
│   └── src/
│       ├── assets/         
│       └── components/     
│
└── backend/                
    ├── models/
    └── server.js           
```

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client)

- **Framework:** React (bootstrapped with Vite)
- **Styling:** Tailwind CSS
- **Hosting:** Railway

### Backend (Server)

- **Runtime:** Node.js with Express.js
- **AI Integration:** `@google/generative-ai` SDK (Gemini 2.5 Flash)
- **CORS Policy:** Configured to accept specific production and local origins securely.
- **Hosting:** Railway

### Database

- **Database:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose
- **Structure:** The `Evaluation` schema stores the `userId` (email), item metadata (`category`, `brand`, `condition`), a lightweight `imagePreview` (Base64), and the parsed JSON `evaluation` returned by the AI.

---

## 🚀 Live Demo

The application is fully deployed and hosted on Railway:

👉 **[Live Demo]** *(https://lookbook.up.railway.app/)*

> ⚠️ *Note: The backend may take ~20 seconds to wake up from sleep during the first request.*

---

## 🗄️ Database Architecture (MongoDB)

The application uses **MongoDB Atlas** as its primary cloud database, managed via the **Mongoose** ODM (Object Data Modeling) library. The data persistence layer is designed around a single, comprehensive `Evaluation` collection that securely stores both the user's original input metadata and the AI's generated appraisal.

### `Evaluation` Schema Structure

Below is the exact schema representation used in the backend to validate and structure the data before saving it to the cloud:

```javascript
const evaluationSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true,
    index: true
    // Acts as a partition key to retrieve a specific user's wardrobe feed efficiently.
  },
  category: { 
    type: String, 
    required: true 
    // e.g., "Jacket", "Sneakers", "T-Shirt"
  },
  brand: { 
    type: String, 
    required: true 
    // e.g., "Nike", "Gucci", "Vintage Unbranded"
  },
  condition: { 
    type: String, 
    required: true 
    // e.g., "New", "Good", "Used"
  },
  imagePreview: { 
    type: String, 
    required: true 
    // Base64 encoded string of the lightweight, compressed image uploaded by the user.
  },
  evaluation: {
    // The structured JSON object directly generated and parsed from Gemini 2.5 Flash.
    suggested_price: { type: Number },
    range: {
      min: { type: Number },
      max: { type: Number }
    },
    motivation: { type: String },
    selling_tips: [{ type: String }]
  }
}, { 
  timestamps: true 
  // Automatically manages `createdAt` and `updatedAt` fields, crucial for rendering the UI feed in chronological order.
});
```

## 💻 Local Development Setup

If you wish to run this project locally on your machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and cluster
- A [Google AI Studio](https://aistudio.google.com/) API Key

### 1. Clone the repository
```bash
git clone https://github.com/sadsotti/lookbook.git
cd lookbook
```

### 2. Backend Setup

Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your credentials:
```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
API_KEY=your_gemini_api_key
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup

Open a new terminal window, navigate to the frontend folder, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## ☁️ Deployment (Railway Setup)

This project uses a **monorepo** structure, making it easy to deploy both the frontend and backend from a single GitHub repository using Railway.

### 1. Backend Service

| Setting | Value |
|---|---|
| Root Directory | `/backend` |
| Start Command | `node server.js` |
| Environment Variables | `MONGO_URI`, `API_KEY`, `PORT` |

### 2. Frontend Service

| Setting | Value |
|---|---|
| Root Directory | `/frontend` |
| Build Command | Automatically handled by Vite |

> 💡 **Dynamic Routing:** The frontend automatically detects if it's running on `localhost` or production and adjusts API calls accordingly.

---

## 🔗 Useful Links

* **start2impact:** [https://www.start2impact.it/](https://www.start2impact.it/)
* **My LinkedIn:** [https://www.linkedin.com/in/lorenzo-sottile/](https://www.linkedin.com/in/lorenzo-sottile/)

---
