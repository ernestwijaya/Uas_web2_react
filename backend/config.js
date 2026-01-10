import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// =======================
// Connection Pool
// =======================
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'prediction_app',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// =======================
// Init Database Tables
// =======================
export async function initDatabase() {
  let connection;

  try {
    connection = await pool.getConnection();

    // =======================
    // food_predictions
    // =======================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS food_predictions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        food_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        calories FLOAT NOT NULL,
        protein FLOAT NOT NULL,
        carbs FLOAT NOT NULL,
        fat FLOAT NOT NULL,
        iron FLOAT DEFAULT 0,
        vitamin_c FLOAT DEFAULT 0,
        predicted_nutrition JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // =======================
    // weight_predictions
    // =======================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS weight_predictions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        height FLOAT NOT NULL,
        gender VARCHAR(20) NOT NULL,
        age INT NOT NULL,
        current_weight FLOAT NOT NULL,
        ideal_weight FLOAT NOT NULL,
        difference FLOAT,
        status VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables initialized successfully');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}
