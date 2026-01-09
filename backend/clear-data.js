import mysql from 'mysql2/promise';

async function deleteAllData() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'prediction_app'
    });

    console.log('✅ Connected to MySQL');

    // Hapus semua data
    await connection.execute(`DELETE FROM food_predictions`);
    console.log('✅ Semua data food_predictions dihapus');

    await connection.end();
    console.log('\n✅ Done! Database sudah dibersihkan.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deleteAllData();
