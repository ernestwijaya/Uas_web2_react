import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  try {
    // =======================
    // Connect ke MySQL (tanpa DB)
    // =======================
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ Connected to MySQL');

    // =======================
    // Create Database
    // =======================
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS prediction_app`
    );
    console.log('✅ Database "prediction_app" ready');

    await connection.execute(`USE prediction_app`);

    // =======================
    // Drop tables (opsional, aman saat develop)
    // =======================
    await connection.execute(`DROP TABLE IF EXISTS food_predictions`);
    await connection.execute(`DROP TABLE IF EXISTS weight_predictions`);

    // =======================
    // Create food_predictions table
    // =======================
    await connection.execute(`
      CREATE TABLE food_predictions (
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
    console.log('✅ Table "food_predictions" created');

    // =======================
    // Create weight_predictions table
    // =======================
    await connection.execute(`
      CREATE TABLE weight_predictions (
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
    console.log('✅ Table "weight_predictions" created');

    await connection.end();

    console.log('\n🎉 Database setup completed successfully!');
    console.log('👉 Sekarang jalankan: npm start\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
