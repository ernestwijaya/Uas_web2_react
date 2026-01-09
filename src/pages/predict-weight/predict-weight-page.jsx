import { useState } from "react";
import WeightRight from "../predict-weight/components/weight_right";
import FormWeight from "../predict-weight/components/form-weight";
import bgImageBack from "../../assets/background_back.jpg";
import bgImage from "../../assets/pp.jpeg";
import bgGym from "../../assets/gym.jpeg";
import WeightCenter from "./components/weight-center";

function PredictWeightPage() {
  const [predictResult, setPredictResult] = useState(null);
  const [isLoading, setLoading] = useState(false);

  return (
    <div
      className="min-h-screen bg-slate-50 flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgGym})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="grid grid-cols-3 gap-5 bg-white p-5 rounded-3xl max-w-7xl shadow w-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left Column - Form */}
        <div>
          <h3 className="text-indigo-600 font-semibold mb-1">Prediksi</h3>
          <h1 className="text-2xl font-bold mb-4">Prediksi Berat Badan Ideal</h1>
          <p className="text-gray-600 mb-6 text-sm">
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

        {/* Center Column - Center Results */}
        <div>
          <WeightCenter predictResult={predictResult} />
        </div>

        {/* Right Column - Right Results */}
        <div>
          <WeightRight predictResult={predictResult} />
        </div>
      </div>
    </div>
  );
}

export default PredictWeightPage;
