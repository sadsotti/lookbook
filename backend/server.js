import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import Evaluation from './models/Evaluation.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://lookbook-s2i.netlify.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
  } catch (err) {
    throw err;
  }
};

const SYSTEM_PROMPT = `You are a fashion expert. Analyze the item and return ONLY JSON: { "suggested_price": number, "range": { "min": number, "max": number }, "motivation": "string", "selling_tips": ["string"] }`;

app.post('/api/evaluate', async (req, res) => {
  try {
    await connectDB();

    let data = req.body;
    if (!data || Object.keys(data).length === 0) {
      const event = req.apiGateway?.event || req.event;
      if (event && event.body) {
        const rawBody = event.isBase64Encoded 
          ? Buffer.from(event.body, 'base64').toString('utf8') 
          : event.body;
        data = JSON.parse(rawBody);
      }
    }

    const { imageBase64, category, brand, condition, userId } = data || {};

    if (!userId || !imageBase64) {
      return res.status(400).json({ 
        error: "User ID and Image are required"
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      systemInstruction: SYSTEM_PROMPT 
    });

    const mimeType = imageBase64.split(';')[0].split(':')[1] || "image/jpeg";
    const imageParts = [{
      inlineData: { data: imageBase64.split(',')[1], mimeType }
    }];

    const result = await model.generateContent([
      `Analyze this item. Category: ${category}, Brand: ${brand}, Condition: ${condition}`,
      ...imageParts
    ]);

    const response = await result.response;
    let text = response.text().replace(/```json|```/g, '').trim();
    const evaluationData = JSON.parse(text);

    const newEvaluation = new Evaluation({
      userId, category, brand, condition,
      imagePreview: imageBase64,
      evaluation: evaluationData
    });

    const saved = await newEvaluation.save();
    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ error: "Analysis failed", details: error.message });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    await connectDB();
    const { userId } = req.query;
    if (userId === 'health-check') return res.status(200).json({ status: "ok" });
    if (!userId) return res.status(400).json({ error: "User ID required" });
    const history = await Evaluation.find({ userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log('Local Server: http://localhost:3000'));
}

export const handler = serverless(app);