import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
    return (
        <div className="flex flex-col items-center justify-between w-screen min-h-dvh">
            <Navbar />
            <main className="flex flex-col grow items-center w-full min-h-[100%] bg-[url(/bg.jpg)] bg-cover">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
