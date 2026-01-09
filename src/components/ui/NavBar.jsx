import { Link } from "react-router-dom";

function Navbar(){
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        🏥
      </div>
      <div className="flex-1 font-bold text-xl">
          <b> Health Predict</b>
      </div>
      <div className="flex-none gap-2 font-bold text-2xl">
        <div className="dropdown dropdown-end font-extrabold text-2xl">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            Menu Prediksi
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17l4.59,-4.59L18,10l-6,6 -6,-6 1.41,-1.42z"/></svg>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to="/">
                🏠 Home Page
              </Link>
            </li>
            <li>
              <Link to="/predict-food">
                🍽️ Prediksi Gizi Makanan
              </Link>
            </li>
            <li>
              <Link to="/predict-weight">
                ⚖️ Prediksi Berat Badan Ideal
              </Link>
            </li>
            <li>
              <Link to="/history">
                📜 Riwayat Prediksi
              </Link>
            </li>
            <li>
              <Link to="/about">
                ℹ️ Tentang Kami
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar