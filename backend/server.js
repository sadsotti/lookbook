import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Evaluation from './models/Evaluation.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://lookbook.up.railway.app' 
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Database'))
  .catch((err) => console.error('MongoDB connection error:', err));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const SYSTEM_PROMPT = `
You are an expert second-hand fashion appraiser working for the LookBook app. 
Your task is to analyze used clothing items based on an image provided by the user and the metadata (Category, Brand, Condition).
Evaluate the seasonality, rarity, potential demand, and perceived quality.

YOU MUST respond EXCLUSIVELY with a valid JSON object, without markdown blocks or text outside the JSON. Use this exact structure:
{
  "suggested_price": 22,
  "range": { "min": 18, "max": 27 },
  "motivation": "Concise explanation based on brand, condition, and image analysis...",
  "selling_tips": ["Improve lighting in the photo", "Post in the evening between 6 PM and 9 PM"]
}`;

app.get('/api/history', async (req, res) => {
  try {
    const { userId } = req.query; 
    if (!userId) return res.status(400).json({ error: "User ID is required" });
    if (userId === 'health-check') return res.status(200).json({ status: "ok" });
    
    const history = await Evaluation.find({ userId: userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.post('/api/evaluate', async (req, res) => {
  console.log("INCOMING REQUEST FROM FRONTEND!");

  try {
    const { imageBase64, category, brand, condition, userId } = req.body;
    
    console.log(`User: ${userId} | Category: ${category} | Brand: ${brand}`);
    console.log(`Image Size: ${imageBase64 ? imageBase64.length : 'NO IMAGE'}`);

    if (!userId || !imageBase64) {
      console.log("ERROR: Missing User ID or Image");
      return res.status(400).json({ error: "User ID and Image are required" });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT
    });

    const userMessage = `Analyze this item.\nCategory: ${category}\nBrand: ${brand}\nCondition: ${condition}`;
    const imageParts = [{
      inlineData: { data: imageBase64.split(',')[1], mimeType: "image/jpeg" }
    }];

    console.log("Sending image to Gemini AI...");
    const result = await model.generateContent([userMessage, ...imageParts]);
    let responseText = result.response.text();
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    console.log("Received response from Gemini. Parsing JSON...");
    const evaluationData = JSON.parse(responseText);

    console.log("Saving to MongoDB...");
    const newEvaluation = new Evaluation({
      userId, category, brand, condition,
      imagePreview: imageBase64,
      evaluation: evaluationData
    });

    const savedEvaluation = await newEvaluation.save();
    console.log("Successfully saved and returning to frontend!");
    res.status(201).json(savedEvaluation);

  } catch (error) {
    console.error("CRITICAL BACKEND ERROR: (I'm going crazy! :D)", error);
    
    res.status(500).json({ 
      error: "Error during analysis",
      real_reason: error.message,
      stack: error.stack
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LookBook AI Backend running on port ${PORT}`));