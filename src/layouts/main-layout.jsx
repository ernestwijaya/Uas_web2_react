import { Outlet } from "react-router"
import Navbar from "../components/ui/NavBar"

function mainLayout() {
    return <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1">
            <Outlet />
        </div>

        <div>
            <footer className="bg-neutral text-neutral-content p-10 flex items-center justify-center">
                <b>@2025 Kelompok 3</b>
            </footer>
        </div>
    </div>

}

export default mainLayout