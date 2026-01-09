import { useState } from "react";
import bgTeio from '../../assets/home.png';

const NEWS_DATA = [
  {
    id: 1,
    title: "Pentingnya Menjaga Berat Badan Ideal",
    category: "Kesehatan",
    date: "7 Januari 2026",
    author: "Dr. Ahmad Setiawan",
    image: "🏥",
    excerpt: "asdwadadsa",
    content: "asdwadadsa."
  },
  {
    id: 2,
    title: "Pencegahan Penyakit Kronis Melalui Gaya Hidup Sehat",
    category: "Kesehatan",
    date: "29 Desember 2025",
    author: "Dr. Linda Wijaya",
    image: "❤️",
    excerpt: "Penyakit kronis seperti diabetes dan hipertensi dapat dicegah melalui gaya hidup sehat yang meliputi nutrisi baik, olahraga, dan istirahat cukup.",
    content: "Penyakit kronis seperti diabetes tipe 2 dan hipertensi dapat dicegah atau dikontrol melalui perubahan gaya hidup yang konsisten. Mulai dari mengurangi asupan gula dan garam, hingga meningkatkan aktivitas fisik harian."
  },
  {
    id: 3,
    title: "Pentingnya Konsultasi Dokter Secara Berkala",
    category: "Kesehatan",
    date: "27 Desember 2025",
    author: "Dr. Hendra Kusuma",
    image: "👨‍⚕️",
    excerpt: "Pemeriksaan kesehatan berkala sangat penting untuk mendeteksi dini potensi masalah kesehatan sebelum menjadi serius.",
    content: "Pemeriksaan kesehatan berkala minimal setahun sekali sangat penting untuk semua orang. Terutama bagi mereka yang memiliki riwayat keluarga dengan penyakit kronis. Jangan tunggu sampai merasa sakit untuk berkonsultasi dengan dokter."
  }
];

function HomePage() {
  const [expandedNews, setExpandedNews] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Kesehatan"];
  
  const filteredNews = selectedCategory === "Semua" 
    ? NEWS_DATA 
    : NEWS_DATA.filter(item => item.category === selectedCategory);

  const toggleExpand = (id) => {
    setExpandedNews(expandedNews === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100" style={{backgroundImage: `url(${bgTeio})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">📰 Berita Kesehatan</h1>
          <p className="text-blue-100 text-lg">Informasi terkini tentang kesehatan, nutrisi, dan gaya hidup sehat</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Category */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Filter Kategori</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Image/Icon */}
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 h-40 flex items-center justify-center text-6xl">
                {news.image}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="badge badge-primary text-xs">{news.category}</span>
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  {expandedNews === news.id ? news.content : news.excerpt}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Oleh: {news.author}</span>
                  <button
                    onClick={() => toggleExpand(news.id)}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    {expandedNews === news.id ? "Tutup" : "Baca Selengkapnya"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada berita dalam kategori ini</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
