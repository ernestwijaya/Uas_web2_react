import bgImageBack from '../../assets/home.png';

function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-indigo-100 py-12" style={{backgroundImage: `url(${bgImageBack})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="max-w-4xl mx-auto px-4" >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Health Predict</h1>
          <p className="text-lg text-gray-600">Platform Prediksi Kesehatan Berbasis Web</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* About Project */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">📖 Tentang Proyek</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Health Predict</strong> adalah aplikasi web inovatif yang dirancang untuk membantu pengguna dalam memprediksi dan memantau kesehatan mereka. Aplikasi ini menyediakan dua fitur utama: prediksi nutrisi makanan dan prediksi berat badan ideal.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Dengan menggunakan algoritma berbasis ilmu pengetahuan, Health Predict memberikan insights berharga tentang nilai nutrisi makanan dan memberikan rekomendasi berat badan ideal berdasarkan profil pengguna (tinggi badan, jenis kelamin, dan usia).
            </p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">✨ Fitur Utama</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="text-3xl mb-2">🍽️</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Prediksi Nutrisi Makanan</h3>
                <p className="text-gray-600 text-sm">
                  Analisis nilai nutrisi makanan dengan detail lengkap termasuk kalori, protein, karbohidrat, lemak, besi, dan vitamin C. Pilih dari dataset makanan predefined atau input data manual.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-3xl mb-2">⚖️</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Prediksi Berat Badan Ideal</h3>
                <p className="text-gray-600 text-sm">
                  Hitung berat badan ideal Anda berdasarkan tinggi badan, jenis kelamin, dan usia menggunakan formula Broca yang dimodifikasi. Dapatkan status (Kurang/Normal/Lebih) dengan rekomendasi.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Riwayat Prediksi</h3>
                <p className="text-gray-600 text-sm">
                  Simpan dan lihat semua hasil prediksi Anda di database. Pantau perkembangan kesehatan Anda dari waktu ke waktu dengan mudah.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="text-3xl mb-2">📰</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Berita & Edukasi</h3>
                <p className="text-gray-600 text-sm">
                  Baca artikel berita dan tips kesehatan dari para ahli. Tingkatkan pengetahuan Anda tentang gaya hidup sehat dan nutrisi.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">🛠️ Teknologi yang Digunakan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-600 mb-3">Frontend</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>⚛️ React 19.2.0</li>
                  <li>🎨 Tailwind CSS 4.1.18</li>
                  <li>🎭 DaisyUI 5.5.14</li>
                  <li>🛣️ React Router 7.11.0</li>
                  <li>📡 Axios 1.13.2</li>
                  
                </ul>
              </div>

              {/* Backend */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-600 mb-3">Backend</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>🟢 Node.js</li>
                  <li>⚡ Express 4.18.2</li>
                  <li>🔄 CORS</li>
                  <li>📦 Body Parser</li>
                  <li>🗄️ MySQL2</li>
                  <li>🐍 Python</li>
                </ul>
              </div>

              {/* Database */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-600 mb-3">Database</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>🗄️ MySQL</li>
                  <li>📊 food_predictions</li>
                  <li>📈 weight_predictions</li>
                  <li>🔐 Connection Pool</li>
                  <li>⏰ Auto Timestamps</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">🚀 Cara Kerja</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">1</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Input Data</h3>
                  <p className="text-gray-600 text-sm">Pengguna memasukkan data makanan atau data personal (tinggi, berat, usia, jenis kelamin)</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">2</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Prediksi & Analisis</h3>
                  <p className="text-gray-600 text-sm">Backend memproses data menggunakan algoritma prediksi berbasis ilmu kesehatan</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">3</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Simpan ke Database</h3>
                  <p className="text-gray-600 text-sm">Hasil prediksi disimpan secara otomatis ke database MySQL untuk tracking riwayat</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">4</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Tampilkan Hasil</h3>
                  <p className="text-gray-600 text-sm">Pengguna menerima hasil dengan rekomendasi yang dipersonalisasi</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">5</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Monitor Riwayat</h3>
                  <p className="text-gray-600 text-sm">Pengguna dapat melihat semua prediksi sebelumnya di halaman riwayat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Algorithms */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">🧮 Algoritma & Formula</h2>
            <div className="space-y-6">
              {/* Broca Formula */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Formula Berat Badan Ideal</h3>
                <div className="bg-gray-50 p-3 rounded mb-2 font-mono text-sm space-y-2">
                  <div>Untuk Pria: Berat Ideal (kg) = Tinggi Badan (cm) – 100</div>
                  <div>Untuk Wanita: Berat Ideal (kg) = Tinggi Badan (cm) – 105</div>
                </div>
                <p className="text-gray-600 text-sm mb-2">Contoh Perhitungan:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Pria tinggi 170 cm: Berat Ideal = 170 - 100 = 70 kg</li>
                  <li>Wanita tinggi 160 cm: Berat Ideal = 160 - 105 = 55 kg</li>
                </ul>
              </div>

              {/* Nutrition Score */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Penilaian Nutrisi (0-100)</h3>
                <p className="text-gray-600 text-sm mb-2">Sistem scoring berdasarkan kriteria:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Protein &gt; 10g: +10 poin</li>
                  <li>Fat 5-30g: +15 poin</li>
                  <li>Carbs &gt; 20g: +15 poin</li>
                  <li>Calories 100-500 kcal: +10 poin</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">💬 Pertanyaan & Dukungan</h2>
            <p className="mb-4">
              Health Predict adalah proyek edukasi yang dikembangkan untuk membantu Anda menjaga kesehatan. Semua informasi yang diberikan merupakan prediksi umum.
            </p>
            <p className="font-semibold mb-3">⚠️ Penting:</p>
            <p className="text-sm opacity-90">
              Untuk diagnosis dan treatment yang akurat, selalu konsultasikan dengan dokter atau ahli gizi profesional. Aplikasi ini tidak menggantikan konsultasi medis.
            </p>
          </div>

          {/* Footer Info */}
          {/* <div className="text-center text-black mt-8 size-5">
              © 2026 Health Predict. Dikembangkan dengan ❤️ untuk kesehatan Anda.
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
