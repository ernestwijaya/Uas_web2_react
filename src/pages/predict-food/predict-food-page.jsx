import { useState } from "react";
import FoodRight from "../predict-food/components/food_right";
import FormPredict from "../predict-food/components/form-food";
import bgImageBack from "../../assets/background_back.jpg";
import bgImage from "../../assets/background.jpg";


function PredictFoodPage() {
    const [predictResult, setPredictResult] = useState(null)
    const [isLoading, setLoading] = useState(false)
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center" style={{backgroundImage: `url(${bgImageBack})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="grid grid-cols-2 gap-5 bg-white p-5 rounded-3xl max-w-6xl shadow w-full" style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div>
                    <h3 className="text-indigo-600 font-semibold mb-1">Prediksi</h3>
                    <h1 className="text-3xl font-bold mb-4">Prediksi Gizi Makanan</h1>
                    <p className="text-gray-600 mb-6">
                        Isi formulir di bawah ini untuk mendapatkan hasil analisis prediksi kesehatan makanan mu.
                    </p>
                    <div>
                        <FormPredict isLoading={isLoading} setLoading={setLoading} setPredictResult={setPredictResult} />
                    </div>
                </div>
                <div>
                    <FoodRight predictResult={predictResult} />
                </div>
            </div>
        </div>
    );
}

export default PredictFoodPage;
