import { useState } from "react";
import http from "../../../../utils/http";

function FormPredict({ isLoading, setLoading, setPredictResult}) {
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

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        
        // Fields yang seharusnya number
        const numericFields = ["calories", "protein", "carbs", "fat", "iron", "vitamin_c"];
        
        setForm((prev) => ({
            ...prev,
            [name]: numericFields.includes(name) ? Number(value) : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            console.log("Mengirim data:", form);
            const response = await http.post("/predict", form);
            console.log("Full Response:", response);
            
            // Handle berbagai format response
            let result = response.data;
            
            if (response.data.data) {
                result = response.data.data;
            }
            
            console.log("Hasil prediksi:", result);
            setPredictResult(result);
            alert("Prediksi berhasil!");
        } catch (error) {
            console.error("Error detail:", error);
            console.error("Error response:", error.response);
            console.error("Error message:", error.message);
            alert("Gagal melakukan prediksi. Error: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="grid grid-cols-2 gap-4 mt-4 text-sm border p-4 rounded-xl">
                <legend className="px-2 text-gray-700">Isi Data Makanan</legend>

                {Object.keys(form).map((field) => (
                    <div className="flex flex-col" key={field}>
                        <label>{field}</label>
                        <input
                            type="text"
                            name={field}
                            value={form[field]}
                            onChange={onHandleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                ))}
            </fieldset>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 mt-4 rounded-xl hover:bg-blue-700 text-sm"
                disabled={isLoading}
            >
                {isLoading ? "Memproses..." : "Lakukan Prediksi"}
            </button>
        </form>
    );
}

export default FormPredict;
