import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  try {
    // Connect to MySQL tanpa database terlebih dahulu
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ Connected to MySQL');

    // Create database
    await connection.execute(`CREATE DATABASE IF NOT EXISTS prediction_app`);
    console.log('✅ Database "prediction_app" created');

    // Select database
    await connection.execute(`USE prediction_app`);

    // Create food_predictions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS food_predictions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        food_name VARCHAR(255),
        category VARCHAR(100),
        calories FLOAT,
        protein FLOAT,
        carbs FLOAT,
        fat FLOAT,
        iron FLOAT,
        vitamin_c FLOAT,
        predicted_nutrition JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table "food_predictions" created');

    // Create weight_predictions table
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
    console.log('✅ Table "weight_predictions" created');

    await connection.end();
    console.log('\n✅ Database setup completed successfully!');
    console.log('Now you can run: npm start\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
