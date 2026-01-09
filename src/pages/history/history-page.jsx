import { useState, useEffect } from "react";
import axios from "axios";
import bgOguri from '../../assets/home.png';

const API_URL = "http://localhost:5000/api";

// Function to determine food health status
const getFoodHealthStatus = (calories, protein, fat, carbs) => {
  let score = 0;
  
  // Calorie check (optimal: 200-400 kcal)
  if (calories >= 200 && calories <= 400) score += 25;
  else if (calories < 200 || (calories > 400 && calories <= 500)) score += 15;
  else score += 5;
  
  // Protein check (optimal: > 5g)
  if (protein > 5) score += 25;
  else score += 10;
  
  // Fat check (optimal: < 15g)
  if (fat < 15) score += 25;
  else if (fat < 25) score += 15;
  else score += 5;
  
  // Carbs check (optimal: 20-50g)
  if (carbs >= 20 && carbs <= 50) score += 25;
  else if (carbs < 20 || (carbs > 50 && carbs <= 60)) score += 15;
  else score += 5;
  
  return score >= 60 ? { status: "Sehat", color: "badge-success" } : { status: "Tidak Sehat", color: "badge-error" };
};

function HistoryPage() {
  const [activeTab, setActiveTab] = useState("makanan");
  const [foodPredictions, setFoodPredictions] = useState([]);
  const [weightPredictions, setWeightPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch food predictions
  const fetchFoodPredictions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/food-predictions`);
      if (response.data.success) {
        setFoodPredictions(response.data.data);
      }
    } catch (err) {
      setError("Gagal memuat data prediksi makanan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weight predictions
  const fetchWeightPredictions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/weight-predictions`);
      if (response.data.success) {
        setWeightPredictions(response.data.data);
      }
    } catch (err) {
      setError("Gagal memuat data prediksi berat badan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "makanan") {
      fetchFoodPredictions();
    } else {
      fetchWeightPredictions();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-indigo-100 py-8" style={{backgroundImage: `url(${bgOguri})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Riwayat Prediksi</h1>
          <p className="text-gray-600">Lihat semua hasil prediksi yang telah disimpan</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("makanan")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "makanan"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400"
            }`}
          >
            🍽️ Prediksi Makanan
          </button>
          <button
            onClick={() => setActiveTab("berat")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "berat"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400"
            }`}
          >
            ⚖️ Prediksi Berat Badan
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-error mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m9-11a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Food Predictions Tab */}
        {activeTab === "makanan" && !loading && (
          <div>
            {foodPredictions.filter(food => food.food_name && food.category).length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-md">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-gray-500 text-lg">Belum ada data prediksi makanan</p>
                <p className="text-gray-400 text-sm mt-2">Mulai lakukan prediksi makanan untuk melihat hasilnya di sini</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {foodPredictions.filter(food => food.food_name && food.category).map((food, index) => (
                  <div key={food.id || index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Nama Makanan</p>
                        <p className="text-xl font-bold text-gray-800">{food.food_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Kategori</p>
                        <p className="text-xl font-bold text-blue-600">{food.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tanggal</p>
                        <p className="text-lg text-gray-700">
                          {new Date(food.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Nutrition Details */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 my-4">
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Kalori</p>
                        <p className="text-lg font-bold text-orange-600">{food.calories} kcal</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Protein</p>
                        <p className="text-lg font-bold text-red-600">{food.protein} g</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Karbohidrat</p>
                        <p className="text-lg font-bold text-yellow-600">{food.carbs} g</p>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Lemak</p>
                        <p className="text-lg font-bold text-amber-600">{food.fat} g</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Besi</p>
                        <p className="text-lg font-bold text-blue-600">{food.iron} mg</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Vitamin C</p>
                        <p className="text-lg font-bold text-green-600">{food.vitamin_c} mg</p>
                      </div>
                    </div>

                    {/* Health Status Badge */}
                    <div className="flex items-center gap-2">
                      {(() => {
                        const healthStatus = getFoodHealthStatus(food.calories, food.protein, food.fat, food.carbs);
                        return (
                          <span className={`badge badge-lg font-bold ${healthStatus.color}`}>
                            {healthStatus.status === "Sehat" ? "✅" : "⚠️"} {healthStatus.status}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Weight Predictions Tab */}
        {activeTab === "berat" && !loading && (
          <div>
            {weightPredictions.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-md">
                <div className="text-6xl mb-4">⚖️</div>
                <p className="text-gray-500 text-lg">Belum ada data prediksi berat badan</p>
                <p className="text-gray-400 text-sm mt-2">Mulai lakukan prediksi berat badan untuk melihat hasilnya di sini</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {weightPredictions.map((weight, index) => (
                  <div key={weight.id || index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Tinggi Badan</p>
                        <p className="text-2xl font-bold text-indigo-600">{weight.height} cm</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Jenis Kelamin</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {weight.gender === "male" ? "👨" : "👩"} {weight.gender === "male" ? "Pria" : "Wanita"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Usia</p>
                        <p className="text-2xl font-bold text-blue-600">{weight.age} tahun</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tanggal</p>
                        <p className="text-sm text-gray-700">
                          {new Date(weight.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Weight Details */}
                    <div className="grid grid-cols-3 gap-4 my-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600">Berat Saat Ini</p>
                        <p className="text-2xl font-bold text-blue-600">{weight.current_weight} kg</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600">Berat Ideal</p>
                        <p className="text-2xl font-bold text-green-600">{weight.ideal_weight} kg</p>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        weight.status === "Kurang"
                          ? "bg-blue-100"
                          : weight.status === "Lebih"
                          ? "bg-orange-100"
                          : "bg-green-100"
                      }`}>
                        <p className="text-xs text-gray-600">Selisih</p>
                        <p className={`text-2xl font-bold ${
                          weight.status === "Kurang"
                            ? "text-blue-600"
                            : weight.status === "Lebih"
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}>
                          {Math.abs(weight.difference)} kg
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span className={`badge badge-lg font-bold ${
                        weight.status === "Kurang"
                          ? "badge-info"
                          : weight.status === "Lebih"
                          ? "badge-warning"
                          : "badge-success"
                      }`}>
                        Status: {weight.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
