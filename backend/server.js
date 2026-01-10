import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { pool, initDatabase } from './config.js';

const app = express();
const PORT = 5000;

// =======================
// Middleware
// =======================
app.use(cors());
app.use(bodyParser.json());

// =======================
// Helper Functions
// =======================
function calculateNutritionScore(protein, fat, carbs, calories) {
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

  return recommendations.length > 0
    ? recommendations
    : ['Nutrisi seimbang'];
}

// =======================
// Init Database
// =======================
try {
  await initDatabase();
} catch (error) {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1);
}

// =======================
// ROUTES
// =======================

// =======================
// Food Prediction (FIXED)
// =======================
app.post('/api/predict', async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const {
      food_name,
      category,
      protein,
      fat,
      carbs,
      calories,
      iron,
      vitamin_c
    } = req.body;

    // Validasi dasar
    if (!food_name || !category) {
      return res.status(400).json({
        success: false,
        error: 'Nama makanan dan kategori wajib diisi'
      });
    }

    const predictedNutrition = {
      food_name,
      category,
      protein,
      fat,
      carbs,
      calories,
      iron,
      vitamin_c,
      nutritionScore: calculateNutritionScore(protein, fat, carbs, calories),
      recommendation: getNutritionRecommendation(protein, fat, carbs, calories)
    };

    // ✅ LANGSUNG INSERT (TANPA CEK DUPLIKAT)
    await connection.execute(
      `INSERT INTO food_predictions
       (food_name, category, calories, protein, carbs, fat, iron, vitamin_c, predicted_nutrition)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        food_name,
        category,
        calories,
        protein,
        carbs,
        fat,
        iron,
        vitamin_c,
        JSON.stringify(predictedNutrition)
      ]
    );

    res.json({
      success: true,
      message: 'Prediksi gizi berhasil disimpan',
      data: predictedNutrition
    });

  } catch (error) {
    console.error('❌ Error processing food prediction:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// =======================
// Get Food Predictions
// =======================
app.get('/api/food-predictions', async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM food_predictions ORDER BY created_at DESC'
    );

    const formatted = rows.map(item => ({
      ...item,
      predicted_nutrition:
        typeof item.predicted_nutrition === 'string'
          ? JSON.parse(item.predicted_nutrition)
          : item.predicted_nutrition
    }));

    res.json({
      success: true,
      data: formatted
    });

  } catch (error) {
    console.error('❌ Error fetching food predictions:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    connection.release();
  }
});

// =======================
// Weight Predictions
// =======================
app.post('/api/weight-predictions', async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const {
      height,
      gender,
      age,
      currentWeight,
      idealWeight,
      difference,
      status
    } = req.body;

    await connection.execute(
      `INSERT INTO weight_predictions
       (height, gender, age, current_weight, ideal_weight, difference, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [height, gender, age, currentWeight, idealWeight, difference, status]
    );

    res.json({
      success: true,
      message: 'Prediksi berat badan berhasil disimpan'
    });

  } catch (error) {
    console.error('❌ Error saving weight prediction:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    connection.release();
  }
});

// =======================
// Get Weight Predictions
// =======================
app.get('/api/weight-predictions', async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM weight_predictions ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error('❌ Error fetching weight predictions:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    connection.release();
  }
});

// =======================
// Health Check
// =======================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    time: new Date()
  });
});

// =======================
// Start Server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
