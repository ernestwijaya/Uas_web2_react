import { useState } from "react";
import WeightRight from "../predict-weight/components/weight_right";
import FormWeight from "../predict-weight/components/form-weight";
import bgImageBack from "../../assets/background_back.jpg";
import bgImage from "../../assets/background.jpg";

function PredictWeightPage() {
  const [predictResult, setPredictResult] = useState(null);
  const [isLoading, setLoading] = useState(false);

  return (
    <div
      className="min-h-screen bg-slate-50 flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImageBack})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="grid grid-cols-2 gap-5 bg-white p-5 rounded-3xl max-w-6xl shadow w-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h3 className="text-indigo-600 font-semibold mb-1">Prediksi</h3>
          <h1 className="text-3xl font-bold mb-4">Prediksi Berat Badan Ideal</h1>
          <p className="text-gray-600 mb-6">
            Isi formulir di bawah ini untuk mendapatkan hasil prediksi berat
            badan ideal berdasarkan tinggi badan, jenis kelamin, dan usia Anda.
          </p>
          <div>
            <FormWeight
              isLoading={isLoading}
              setLoading={setLoading}
              setPredictResult={setPredictResult}
            />
          </div>
        </div>
        <div>
          <WeightRight predictResult={predictResult} />
        </div>
      </div>
    </div>
  );
}

export default PredictWeightPage;
