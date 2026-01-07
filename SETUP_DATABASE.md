# Setup Database MySQL

## Langkah-langkah Setup

### 1. Buat Database di MySQL

```sql
CREATE DATABASE prediction_app;
```

### 2. Setup Backend

Masuk ke folder backend:
```bash
cd backend
npm install
```

### 3. Buat File .env

Copy file `.env.example` menjadi `.env` dan sesuaikan konfigurasi:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=prediction_app
DB_PORT=3306
```

**Catatan**: Ganti nilai-nilai di atas sesuai dengan konfigurasi MySQL Anda

### 4. Jalankan Backend Server

```bash
npm start
```

atau untuk development dengan auto-reload:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### 5. Update Package React

Pastikan `axios` sudah terinstall di React:
```bash
npm install axios
```

## Database Tables

### food_predictions
- `id`: INT (Primary Key)
- `protein`: FLOAT
- `fat`: FLOAT
- `carbs`: FLOAT
- `calories`: FLOAT
- `predicted_nutrition`: JSON
- `created_at`: TIMESTAMP

### weight_predictions
- `id`: INT (Primary Key)
- `height`: FLOAT
- `gender`: VARCHAR(20)
- `age`: INT
- `current_weight`: FLOAT
- `ideal_weight`: FLOAT
- `difference`: FLOAT
- `status`: VARCHAR(20)
- `created_at`: TIMESTAMP

## API Endpoints

### Food Predictions
- **POST** `/api/food-predictions` - Simpan prediksi makanan
- **GET** `/api/food-predictions` - Ambil daftar prediksi makanan

### Weight Predictions
- **POST** `/api/weight-predictions` - Simpan prediksi berat badan
- **GET** `/api/weight-predictions` - Ambil daftar prediksi berat badan

### Health Check
- **GET** `/api/health` - Check status server

## Testing

Anda bisa test API menggunakan Postman atau curl:

```bash
# Test health check
curl http://localhost:5000/api/health

# Test POST food prediction
curl -X POST http://localhost:5000/api/food-predictions \
  -H "Content-Type: application/json" \
  -d '{
    "protein": 20,
    "fat": 10,
    "carbs": 50,
    "calories": 400,
    "predictedNutrition": {}
  }'

# Test GET food predictions
curl http://localhost:5000/api/food-predictions
```

## Troubleshooting

### Error: Cannot find module 'mysql2'
```bash
cd backend
npm install mysql2
```

### Error: Connection refused to localhost:3306
- Pastikan MySQL Server sudah berjalan
- Cek konfigurasi di file `.env`

### Error: Unknown database 'prediction_app'
```sql
CREATE DATABASE prediction_app;
```
