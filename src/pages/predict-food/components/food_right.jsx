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
                const totalEnergy = predictResult.energy_calculation?.total_energy_calculated || 0;
                const isHealthy = totalEnergy >= 1000;
                const healthStatus = isHealthy ? "Sehat" : "Tidak Sehat";
                
                return (
                    <div className={`text-2xl font-bold p-4 rounded-lg text-center mb-4 ${
                        isHealthy 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                        {healthStatus}
                    </div>
                );
            })()}
            
            {/* Detail Informasi */}
            <div className="space-y-2 text-sm">
                {/* Energy Calculation */}
                {predictResult.energy_calculation?.total_energy_calculated && (
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-700">Total Energi:</span>
                        <span className="text-gray-600">{predictResult.energy_calculation.total_energy_calculated} cal</span>
                    </div>
                )}
                
                {/* Food Info */}
                {predictResult.food_info?.category && (
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-700">Kategori Makanan:</span>
                        <span className="text-gray-600">{predictResult.food_info.category}</span>
                    </div>
                )}
                
                {/* Nutrient Values */}
                {predictResult.nutrient_values && (
                    <>
                        <div className="font-semibold text-gray-700 mt-3 pt-2 border-t">Nilai Nutrisi:</div>
                        {Object.entries(predictResult.nutrient_values).map(([key, value]) => (
                            <div key={key} className="flex justify-between pl-4">
                                <span className="text-gray-700">{key}:</span>
                                <span className="text-gray-600">{String(value)}</span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default FoodRight;   
