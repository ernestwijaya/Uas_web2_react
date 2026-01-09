import { useState } from "react";
import http from "../../../../utils/http";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Dataset makanan predefined
const FOOD_DATASET = [
    { id: 1, name: "Nasi Putih", category: "Karbohidrat", calories: 206, protein: 4.3, carbs: 45, fat: 0.3, iron: 0.8, vitamin_c: 0 },
    { id: 2, name: "Ayam Goreng", category: "Protein", calories: 320, protein: 30, carbs: 0, fat: 22, iron: 1.3, vitamin_c: 0 },
    { id: 3, name: "Telur Rebus", category: "Protein", calories: 155, protein: 13, carbs: 1.1, fat: 11, iron: 1.2, vitamin_c: 0 },
    { id: 4, name: "Sayuran Hijau", category: "Sayuran", calories: 31, protein: 2.9, carbs: 5.8, fat: 0.4, iron: 2.7, vitamin_c: 89 },
    { id: 5, name: "Ikan Salmon", category: "Protein", calories: 280, protein: 25, carbs: 0, fat: 20, iron: 0.8, vitamin_c: 0 },
    { id: 6, name: "Buah Apel", category: "Buah", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, iron: 0.1, vitamin_c: 5 },
    { id: 7, name: "Roti Gandum", category: "Karbohidrat", calories: 246, protein: 9, carbs: 41, fat: 1.5, iron: 2.7, vitamin_c: 0 },
    { id: 8, name: "Susu", category: "Minuman", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, iron: 0.1, vitamin_c: 1 },
    { id: 9, name: "Yogurt", category: "Minuman", calories: 59, protein: 3.5, carbs: 3.6, fat: 0.4, iron: 0.1, vitamin_c: 0 },
    { id: 10, name: "Kacang Almond", category: "Camilan", calories: 579, protein: 21, carbs: 22, fat: 50, iron: 3.7, vitamin_c: 0 }
];

function FormPredict({ isLoading, setLoading, setPredictResult}) {
    const [inputMode, setInputMode] = useState("manual");
    const [selectedFoodId, setSelectedFoodId] = useState(null);
    
    const [form, setForm] = useState({
        food_name: "",
        category: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        iron: 0,
        vitamin_c: 0
    });

    const [isSubmitting, setIsSubmitting] = useState(false);    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFoodSelect = (foodId) => {
        const selectedFood = FOOD_DATASET.find(f => f.id === foodId);
        if (selectedFood) {
            setSelectedFoodId(foodId);
            setForm({
                food_name: selectedFood.name,
                category: selectedFood.category,
                calories: selectedFood.calories,
                protein: selectedFood.protein,
                carbs: selectedFood.carbs,
                fat: selectedFood.fat,
                iron: selectedFood.iron,
                vitamin_c: selectedFood.vitamin_c
            });
        }
    };

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        const numericFields = ["calories", "protein", "carbs", "fat", "iron", "vitamin_c"];
        
        setForm((prev) => ({
            ...prev,
            [name]: numericFields.includes(name) ? Number(value) : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        // Validasi input - pastikan semua field terisi
        if (!form.food_name || form.food_name.trim() === "") {
            setErrorMessage("❌ Nama makanan harus diisi!");
            setLoading(false);
            return;
        }

        if (!form.category || form.category.trim() === "") {
            setErrorMessage("❌ Kategori makanan harus diisi!");
            setLoading(false);
            return;
        }

        if (form.calories <= 0 || form.protein < 0 || form.carbs < 0 || form.fat < 0) {
            setErrorMessage("❌ Nilai nutrisi harus berisi angka positif!");
            setLoading(false);
            return;
        }

        // Jika sudah dalam proses submit, jangan submit lagi
        if (isSubmitting) {
            setErrorMessage("❌ Tunggu hingga proses selesai...");
            return;
        }

        setIsSubmitting(true);

        try {
            console.log("Mengirim data:", form);
            const response = await http.post("/predict", form);
            console.log("Full Response:", response);
            
            let result = response.data;
            if (response.data.data) {
                result = response.data.data;
            }
            
            console.log("Hasil prediksi:", result);
            setPredictResult(result);
            setSuccessMessage('Prediksi makanan berhasil dilakukan!');
            
            try {
                const dbResponse = await axios.post(`${API_URL}/food-predictions`, {
                    food_name: form.food_name,
                    category: form.category,
                    protein: form.protein,
                    fat: form.fat,
                    carbs: form.carbs,
                    calories: form.calories,
                    iron: form.iron,
                    vitamin_c: form.vitamin_c,
                    predictedNutrition: result
                });
                
                if (dbResponse.data.success) {
                    setSuccessMessage('✅ Prediksi berhasil disimpan ke database');
                    // Reset form setelah berhasil
                    setForm({
                        food_name: "",
                        category: "",
                        calories: 0,
                        protein: 0,
                        carbs: 0,
                        fat: 0,
                        iron: 0,
                        vitamin_c: 0
                    });
                    setSelectedFoodId(null);
                    setTimeout(() => setSuccessMessage(null), 4000);
                } else {
                    setErrorMessage(`❌ ${dbResponse.data.error || 'Gagal menyimpan ke database'}`);
                }
            } catch (dbError) {
                console.error('Error saving to database:', dbError);
                // Cek apakah response dari backend
                if (dbError.response?.data?.error) {
                    setErrorMessage(`❌ ${dbError.response.data.error}`);
                } else {
                    setErrorMessage('❌ Gagal menghubungi server untuk menyimpan data');
                }
            }
        } catch (error) {
            console.error("Error detail:", error);
            
            let errorMsg = "Gagal melakukan prediksi";
            if (error.response?.status === 404) {
                errorMsg = "Backend server tidak tersedia. Pastikan backend sudah berjalan di http://localhost:5000";
            } else if (error.response?.data?.message) {
                errorMsg = error.response.data.message;
            } else if (error.message) {
                errorMsg = error.message;
            }
            
            setErrorMessage(errorMsg);
        } finally {
            setLoading(false);
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && (
                <div className="alert alert-error mb-4">
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
                    <span>{errorMessage}</span>
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success mb-4">
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Pilihan Input Mode */}
            <div className="form-control mb-6">
                <label className="label">
                    <span className="label-text font-semibold text-lg">Pilih Cara Pengisian Data</span>
                </label>
                <div className="flex gap-4 mt-2">
                    <label className="label cursor-pointer flex-1">
                        <input 
                            type="radio" 
                            name="inputMode" 
                            className="radio radio-primary"
                            checked={inputMode === "dataset"}
                            onChange={() => {
                                setInputMode("dataset");
                                setSelectedFoodId(null);
                                setForm({
                                    food_name: "",
                                    category: "",
                                    calories: 0,
                                    protein: 0,
                                    carbs: 0,
                                    fat: 0,
                                    iron: 0,
                                    vitamin_c: 0
                                });
                            }}
                        />
                        <span className="label-text ml-2">📊 Pilih dari Dataset</span>
                    </label>
                    <label className="label cursor-pointer flex-1">
                        <input 
                            type="radio" 
                            name="inputMode" 
                            className="radio radio-primary"
                            checked={inputMode === "manual"}
                            onChange={() => {
                                setInputMode("manual");
                                setSelectedFoodId(null);
                            }}
                        />
                        <span className="label-text ml-2">✏️ Input Manual</span>
                    </label>
                </div>
            </div>

            {/* Dataset Mode */}
            {inputMode === "dataset" && (
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text font-semibold">Pilih Makanan dari Dataset</span>
                    </label>
                    <select
                        className="select select-bordered"
                        value={selectedFoodId || ""}
                        onChange={(e) => handleFoodSelect(Number(e.target.value))}
                        disabled={isLoading}
                    >
                        <option value="">-- Pilih Makanan --</option>
                        {FOOD_DATASET.map((food) => (
                            <option key={food.id} value={food.id}>
                                {food.name} ({food.category}) - {food.calories} kcal
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Manual Input Mode */}
            {inputMode === "manual" && (
                <fieldset className="grid grid-cols-2 gap-4 mt-4 text-sm border p-4 rounded-xl">
                    <legend className="px-2 text-gray-700">Isi Data Makanan Manual</legend>

                    {Object.keys(form).map((field) => (
                        <div className="flex flex-col" key={field}>
                            <label className="font-semibold text-xs mb-1">{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={form[field]}
                                onChange={onHandleChange}
                                className="border p-2 rounded"
                                placeholder={`Masukkan ${field}`}
                            />
                        </div>
                    ))}
                </fieldset>
            )}

            {/* Preview Data */}
            {(form.food_name || selectedFoodId) && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-sm mb-3">📋 Preview Data:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="font-semibold">Nama Makanan:</span> {form.food_name}</div>
                        <div><span className="font-semibold">Kategori:</span> {form.category}</div>
                        <div><span className="font-semibold">Kalori:</span> {form.calories} kcal</div>
                        <div><span className="font-semibold">Protein:</span> {form.protein} g</div>
                        <div><span className="font-semibold">Karbohidrat:</span> {form.carbs} g</div>
                        <div><span className="font-semibold">Lemak:</span> {form.fat} g</div>
                        <div><span className="font-semibold">Besi:</span> {form.iron} mg</div>
                        <div><span className="font-semibold">Vitamin C:</span> {form.vitamin_c} mg</div>
                    </div>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 mt-6 rounded-xl hover:bg-blue-700 text-sm disabled:bg-gray-400"
                disabled={isLoading || isSubmitting || !form.food_name}
            >
                {isLoading || isSubmitting ? (
                    <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Memproses...
                    </>
                ) : (
                    "Lakukan Prediksi"
                )}
            </button>
        </form>
    );
}

export default FormPredict;
