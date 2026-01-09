import idealImg from "../../../assets/ideal.jpeg";
import kurangImg from "../../../assets/kurang.jpeg";
import overloadImg from "../../../assets/overload.png";

function WeightCenter({ predictResult }) {
    if (!predictResult) {
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
        <div className="flex justify-center items-center h-full">
            <div className="text-center">
                <h2 className="text-xl font-bold text-indigo-600 mb-4">Hasil Prediksi</h2>
                <center><img
                    src={
                        predictResult.status === "Kurang"
                            ? kurangImg
                            : predictResult.status === "Lebih"
                                ? overloadImg
                                : idealImg
                    }
                    alt={predictResult.status}
                    className="h-64 w-64 object-cover rounded-lg shadow-lg bg-center"
                /></center>
                <div className={`p-6 rounded-lg shadow-md text-white ${ predictResult.status === "Kurang"
            ? "bg-linear-to-r from-blue-400 to-blue-600" : predictResult.status === "Lebih"
            ? "bg-linear-to-r from-orange-400 to-red-600" : "bg-linear-to-r from-green-400 to-emerald-600" }`}>
            <p className="text-sm opacity-90">Status Berat Badan</p>
            <p className="text-3xl font-bold">{predictResult.status}</p>
            <p className="text-xs mt-2 opacity-75">
                {predictResult.status === "Kurang"
                ? "Berat badan Anda masih kurang. Tingkatkan asupan nutrisi seimbang dan olahraga teratur."
                : predictResult.status === "Lebih"
                ? "Berat badan Anda lebih dari ideal. Coba kurangi dengan pola hidup sehat dan olahraga."
                : "Berat badan Anda sudah ideal. Pertahankan dengan gaya hidup sehat!"}
            </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-xs text-gray-700">
                <strong>Tips:</strong> Berat badan ideal ini adalah referensi umum.
                Untuk hasil yang lebih akurat, konsultasikan dengan dokter atau ahli
                gizi profesional.
            </p>
        </div>
      </div>
    </div>  
    );
}

export default WeightCenter;
