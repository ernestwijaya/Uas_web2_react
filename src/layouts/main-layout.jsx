import { Outlet } from "react-router"
import Navbar from "../components/ui/NavBar"

function mainLayout() {
    return <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1">
            <Outlet />
        </div>

        <div>
            <div className="bg-gray-100 py-8 text-center">
                <p className="text-gray-600 text-sm">
                    💡 Semua informasi kesehatan di sini bersumber dari ahli profesional. Namun, selalu konsultasikan dengan dokter untuk diagnosis dan treatment yang akurat.
                </p>
            </div>

            <footer className="bg-neutral text-neutral-content p-10 flex items-center justify-center">
                <b><font>Copyright © Kelompok 3</font></b>
                <p>
                    &nbsp;|&nbsp;
                </p>
                <b><i><font className="text-xl">Made with ❤️ by <font className="text-red-500"><b>Andre, Rizqi, Ernest, Angky, dan M.Lazuardi</b></font></font></i></b>
            </footer>
        </div>
    </div>

}

export default mainLayout