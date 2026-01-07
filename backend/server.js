import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { pool, initDatabase } from './config.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper functions untuk prediksi gizi
function calculateNutritionScore(protein, fat, carbs, calories) {
  // Scoring 0-100 berdasarkan keseimbangan nutrisi
  let score = 50;
  
  if (protein > 10) score += 10;
  if (fat > 5 && fat < 30) score += 15;
  if (carbs > 20) score += 15;
  if (calories > 100 && calories < 500) score += 10;
  
  return Math.min(score, 100);
}

function getNutritionRecommendation(protein, fat, carbs, calories) {
  const recommendations = [];
  
  if (protein < 5) recommendations.push('Tambahkan sumber protein');
  if (fat > 30) recommendations.push('Kurangi lemak');
  if (carbs < 10) recommendations.push('Tambahkan karbohidrat');
  if (calories < 50) recommendations.push('Kalori terlalu rendah');
  if (calories > 500) recommendations.push('Kalori cukup tinggi');
  
  return recommendations.length > 0 ? recommendations : ['Nutrisi seimbang'];
}

// Initialize database
try {
  await initDatabase();
} catch (error) {
  console.error('Failed to initialize database:', error);
  process.exit(1);
}

// Routes

// Food Predictions
app.post('/api/predict', async (req, res) => {
  try {
    const { protein, fat, carbs, calories, food_name, category } = req.body;
    const connection = await pool.getConnection();

    // Prediksi gizi makanan (bisa disesuaikan dengan logic bisnis)
    const predictedNutrition = {
      food_name: food_name,
      category: category,
      protein: protein,
      fat: fat,
      carbs: carbs,
      calories: calories,
      nutritionScore: calculateNutritionScore(protein, fat, carbs, calories),
      recommendation: getNutritionRecommendation(protein, fat, carbs, calories)
    };

    // Simpan ke database
    await connection.execute(
      'INSERT INTO food_predictions (protein, fat, carbs, calories, predicted_nutrition) VALUES (?, ?, ?, ?, ?)',
      [protein, fat, carbs, calories, JSON.stringify(predictedNutrition)]
    );

    connection.release();

    res.json({
      success: true,
      data: predictedNutrition,
      message: 'Prediksi gizi makanan berhasil'
    });
  } catch (error) {
    console.error('Error processing food prediction:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/food-predictions', async (req, res) => {
  try {
    const { food_name, category, protein, fat, carbs, calories, iron, vitamin_c, predictedNutrition } = req.body;
    const connection = await pool.getConnection();

    await connection.execute(
      'INSERT INTO food_predictions (food_name, category, protein, fat, carbs, calories, iron, vitamin_c, predicted_nutrition) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [food_name, category, protein, fat, carbs, calories, iron, vitamin_c, JSON.stringify(predictedNutrition)]
    );

    connection.release();

    res.json({
      success: true,
      message: 'Prediksi gizi makanan berhasil disimpan ke database'
    });
  } catch (error) {
    console.error('Error saving food prediction:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/food-predictions', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [predictions] = await connection.execute(
      'SELECT * FROM food_predictions ORDER BY created_at DESC LIMIT 20'
    );
    connection.release();

    const formattedPredictions = predictions.map(p => ({
      ...p,
      predicted_nutrition: typeof p.predicted_nutrition === 'string' 
        ? JSON.parse(p.predicted_nutrition) 
        : p.predicted_nutrition
    }));

    res.json({
      success: true,
      data: formattedPredictions
    });
  } catch (error) {
    console.error('Error fetching food predictions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Weight Predictions
app.post('/api/weight-predictions', async (req, res) => {
  try {
    const { height, gender, age, currentWeight, idealWeight, difference, status } = req.body;
    const connection = await pool.getConnection();

    await connection.execute(
      'INSERT INTO weight_predictions (height, gender, age, current_weight, ideal_weight, difference, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [height, gender, age, currentWeight, idealWeight, difference, status]
    );

    connection.release();

    res.json({
      success: true,
      message: 'Prediksi berat badan ideal berhasil disimpan ke database'
    });
  } catch (error) {
    console.error('Error saving weight prediction:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/weight-predictions', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [predictions] = await connection.execute(
      'SELECT * FROM weight_predictions ORDER BY created_at DESC LIMIT 20'
    );
    connection.release();

    res.json({
      success: true,
      data: predictions
    });
  } catch (error) {
    console.error('Error fetching weight predictions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Database: ${process.env.DB_NAME || 'prediction_app'}`);
});
