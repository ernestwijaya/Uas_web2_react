import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function resetDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'prediction_app',
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ Connected to MySQL');

    // Drop existing table
    await connection.execute(`DROP TABLE IF EXISTS food_predictions`);
    console.log('✅ Table "food_predictions" deleted');

    // Recreate with UNIQUE key
    await connection.execute(`
      CREATE TABLE food_predictions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        food_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        calories FLOAT,
        protein FLOAT,
        carbs FLOAT,
        fat FLOAT,
        iron FLOAT,
        vitamin_c FLOAT,
        predicted_nutrition JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_food (food_name, category, calories, protein, fat, carbs)
      )
    `);
    console.log('✅ Table "food_predictions" created dengan UNIQUE key');

    await connection.end();
    console.log('\n✅ Database reset completed successfully!');
    console.log('Sekarang data duplikat tidak akan bisa masuk ke database.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
    process.exit(1);
  }
}

resetDatabase();
