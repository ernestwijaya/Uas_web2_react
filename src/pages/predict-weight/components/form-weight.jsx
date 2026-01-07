import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

function FormWeight({ isLoading, setLoading, setPredictResult }) {
  const [formData, setFormData] = useState({
    height: "",
    gender: "male",
    age: "",
    currentWeight: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  };

  const calculateIdealWeight = (height, gender, age) => {
    // Rumus Broca yang dimodifikasi
    let idealWeight = (height - 100) * 0.9;

    // Penyesuaian berdasarkan jenis kelamin
    if (gender === "female") {
      idealWeight -= idealWeight * 0.1; // Kurangi 10% untuk perempuan
    }

    // Penyesuaian untuk usia
    if (age > 40) {
      idealWeight += (age - 40) * 0.1; // Tambah 0.1 kg per tahun setelah 40
    } else if (age < 18) {
      idealWeight *= 0.95; // Kurangi 5% untuk usia muda
    }

    return Math.round(idealWeight * 10) / 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.height || !formData.age || !formData.currentWeight) {
      setError("Tinggi badan, usia, dan berat badan harus diisi");
      return;
    }

    if (formData.height < 100 || formData.height > 250) {
      setError("Tinggi badan harus antara 100-250 cm");
      return;
    }

    if (formData.age < 5 || formData.age > 120) {
      setError("Usia harus antara 5-120 tahun");
      return;
    }

    if (formData.currentWeight < 20 || formData.currentWeight > 300) {
      setError("Berat badan harus antara 20-300 kg");
      return;
    }

    setLoading(true);

    try {
      // Simulasi API call dengan delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const idealWeight = calculateIdealWeight(
        parseFloat(formData.height),
        formData.gender,
        parseInt(formData.age)
      );

      const currentWeight = parseFloat(formData.currentWeight);
      const difference = currentWeight - idealWeight;
      let status = "Normal";

      if (difference < -5) {
        status = "Kurang";
      } else if (difference > 5) {
        status = "Lebih";
      }

      setPredictResult({
        height: formData.height,
        gender: formData.gender === "male" ? "Laki-laki" : "Perempuan",
        age: formData.age,
        currentWeight: currentWeight,
        idealWeight: idealWeight,
        difference: Math.round(Math.abs(difference) * 10) / 10,
        status: status,
      });

      // Kirim data ke database
      try {
        const response = await axios.post(`${API_URL}/weight-predictions`, {
          height: parseFloat(formData.height),
          gender: formData.gender,
          age: parseInt(formData.age),
          currentWeight: currentWeight,
          idealWeight: idealWeight,
          difference: Math.round(Math.abs(difference) * 10) / 10,
          status: status,
        });

        if (response.data.success) {
          setSuccessMessage(response.data.message);
          setTimeout(() => setSuccessMessage(null), 3000);
        }
      } catch (dbError) {
        console.error('Error saving to database:', dbError);
        setSuccessMessage('Prediksi berhasil, tetapi gagal menyimpan ke database');
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memproses data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="alert alert-error">
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

      {successMessage && (
        <div className="alert alert-success">
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

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Tinggi Badan (cm)</span>
        </label>
        <input
          type="number"
          name="height"
          placeholder="Masukkan tinggi badan"
          className="input input-bordered"
          value={formData.height}
          onChange={handleChange}
          disabled={isLoading}
          min="100"
          max="250"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Jenis Kelamin</span>
        </label>
        <select
          name="gender"
          className="select select-bordered"
          value={formData.gender}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Usia (tahun)</span>
        </label>
        <input
          type="number"
          name="age"
          placeholder="Masukkan usia"
          className="input input-bordered"
          value={formData.age}
          onChange={handleChange}
          disabled={isLoading}
          min="5"
          max="120"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Berat Badan Saat Ini (kg)</span>
        </label>
        <input
          type="number"
          name="currentWeight"
          placeholder="Masukkan berat badan"
          className="input input-bordered"
          value={formData.currentWeight}
          onChange={handleChange}
          disabled={isLoading}
          min="20"
          max="300"
          step="0.1"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Memproses...
          </>
        ) : (
          "Prediksi Berat Badan Ideal"
        )}
      </button>
    </form>
  );
}

export default FormWeight;
