import { Outlet } from "react-router-dom";

import Header from "../components/header";
import ScrollToTop from "../components/scroll-to-top";

const AppLayout = () => {
    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <div className="container px-6 py-4 mx-auto">
                <Header />

                <main>
                    <Outlet />
                </main>

                <ScrollToTop />
            </div>
        </div>
    )
};

export default AppLayout;