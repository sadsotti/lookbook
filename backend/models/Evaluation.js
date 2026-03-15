import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  condition: { type: String, required: true },
  imagePreview: { type: String }, 
  evaluation: {
    suggested_price: { type: Number, required: true },
    range: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    motivation: { type: String, required: true },
    selling_tips: [{ type: String }]
  }
}, { timestamps: true });

export default mongoose.model('Evaluation', evaluationSchema);