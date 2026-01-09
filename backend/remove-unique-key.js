import mysql from 'mysql2/promise';

async function removeUniqueKey() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'prediction_app'
    });

    console.log('✅ Connected to MySQL');

    // Hapus UNIQUE KEY constraint
    await connection.execute(`ALTER TABLE food_predictions DROP INDEX unique_food`);
    console.log('✅ UNIQUE KEY constraint dihapus');

    await connection.end();
    console.log('\n✅ Done! Sekarang duplikat data bisa masuk ke database.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

removeUniqueKey();
