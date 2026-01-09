import { useEffect, useState } from "react";
import idealImg from "../../../assets/ideal.jpeg";
import kurangImg from "../../../assets/kurang.jpeg";
import overloadImg from "../../../assets/overload.png";

function WeightRight({ predictResult }) {
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    if (predictResult) {
      setHasResult(true);
    }
  }, [predictResult]);

  if (!hasResult || !predictResult) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">⚖️</div>
          <p className="text-gray-400 text-sm">
            Isi formulir untuk melihat hasil prediksi
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Hasil Prediksi</h2>

      {/* Gambar Status */}
      {/* <div className="mb-6 flex justify-center">
        <img 
          src={
            predictResult.status === "Kurang" 
              ? kurangImg
              : predictResult.status === "Lebih"
              ? overloadImg
              : idealImg
          }
          alt={predictResult.status}
          className="h-48 w-48 object-cover rounded-lg shadow-lg"
        />
      </div> */}

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Tinggi Badan</p>
          <p className="text-2xl font-bold text-indigo-600">
            {predictResult.height} cm
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Jenis Kelamin</p>
          <p className="text-2xl font-bold text-indigo-600">
            {predictResult.gender}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Berat Badan Saat Ini</p>
          <p className="text-2xl font-bold text-indigo-600">
            {predictResult.currentWeight} kg
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm">Berat Badan Ideal</p>
            <p className="text-2xl font-bold text-green-600">
                {predictResult.idealWeight} kg
            </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm">Selisih Berat Badan</p>
            <p className={`text-2xl font-bold ${ predictResult.status === "Kurang" ? "text-blue-600" : predictResult.status
                === "Lebih" ? "text-orange-600" : "text-green-600" }`}>
                {predictResult.difference} kg {predictResult.status === "Kurang" ? "↑" : "↓"}
            </p>
        </div>
      </div>
    </div>
  );
}

export default WeightRight;
