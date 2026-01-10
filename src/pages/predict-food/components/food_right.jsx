function FoodRight({ predictResult }) {
    if (!predictResult) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                <p>Prediksi makanan akan tampil di sini setelah Anda mengisi formulir</p>
            </div>
        );
    }

    return (
        <div className="mt-4 p-6 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="font-bold text-lg mb-4 text-indigo-700">Hasil Analisis:</h3>
            
            {/* Status Kesehatan */}
            {(() => {
                const nutritionScore = predictResult.nutritionScore || 0;
                const isHealthy = nutritionScore >= 60;
                const healthStatus = isHealthy ? "Sehat" : "Tidak Sehat";
                
                return (
                    <div className={`text-2xl font-bold p-4 rounded-lg text-center mb-4 ${
                        isHealthy 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                        {healthStatus} (Skor: {nutritionScore})
                    </div>
                );
            })()}
            
            {/* Detail Informasi */}
            <div className="space-y-2 text-sm">
                {/* Makanan Info */}
                {predictResult.food_name && (
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-700">Nama Makanan:</span>
                        <span className="text-gray-600">{predictResult.food_name}</span>
                    </div>
                )}
                
                {predictResult.category && (
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-700">Kategori:</span>
                        <span className="text-gray-600">{predictResult.category}</span>
                    </div>
                )}
                
                {/* Nutrition Values */}
                <div className="font-semibold text-gray-700 mt-3 pt-2 border-t">Nilai Nutrisi:</div>
                
                {predictResult.calories && (
                    <div className="flex justify-between pl-4">
                        <span className="text-gray-700">Kalori:</span>
                        <span className="text-gray-600">{predictResult.calories} kcal</span>
                    </div>
                )}
                
                {predictResult.protein !== undefined && (
                    <div className="flex justify-between pl-4">
                        <span className="text-gray-700">Protein:</span>
                        <span className="text-gray-600">{predictResult.protein} g</span>
                    </div>
                )}
                
                {predictResult.carbs !== undefined && (
                    <div className="flex justify-between pl-4">
                        <span className="text-gray-700">Karbohidrat:</span>
                        <span className="text-gray-600">{predictResult.carbs} g</span>
                    </div>
                )}
                
                {predictResult.fat !== undefined && (
                    <div className="flex justify-between pl-4">
                        <span className="text-gray-700">Lemak:</span>
                        <span className="text-gray-600">{predictResult.fat} g</span>
                    </div>
                )}
                
                {predictResult.iron !== undefined && (
                    <div className="flex justify-between pl-4">
                        <span className="text-gray-700">Besi:</span>
                        <span className="text-gray-600">{predictResult.iron} mg</span>
                    </div>
                )}
                
                {predictResult.vitamin_c !== undefined && (
                    <div className="flex justify-between pl-4">
                        <span className="text-gray-700">Vitamin C:</span>
                        <span className="text-gray-600">{predictResult.vitamin_c} mg</span>
                    </div>
                )}
                
                {/* Rekomendasi */}
                {predictResult.recommendation && Array.isArray(predictResult.recommendation) && (
                    <div className="mt-3 pt-2 border-t">
                        <div className="font-semibold text-gray-700 mb-2">Rekomendasi:</div>
                        <ul className="pl-4 space-y-1">
                            {predictResult.recommendation.map((rec, idx) => (
                                <li key={idx} className="text-gray-600 text-xs">• {rec}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FoodRight;   
