import mysql from 'mysql2/promise';

async function setupDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'prediction_app'
    });

    console.log('✅ Connected to MySQL');

    // Drop table lama
    await connection.execute(`DROP TABLE IF EXISTS food_predictions`);
    console.log('✅ Table lama dihapus');

    // Buat table baru dengan UNIQUE KEY
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
    console.log('✅ Table baru dibuat dengan UNIQUE KEY');

    await connection.end();
    console.log('\n✅ Database siap! Duplikat tidak akan bisa masuk.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
