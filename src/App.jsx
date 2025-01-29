import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";

import RootLayout from "./pages/Root.jsx";
import Home from "./pages/Home.jsx";
import Allergies from "./pages/Allergies.jsx";
import dataDishesLoader from "./data/dishes.js";
import GenerateMenu from "./pages/GenerateMenu.jsx";

export const AppContext = createContext([]);

function App() {
    // TODO: move offDays to local storage
    const [offDays, setOffDays] = useState([false, false, false, false, false, true, true]);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,

            children: [
                {
                    path: "",
                    loader: dataDishesLoader,
                    element: <Home offDays={offDays} />,
                },
                {
                    path: "Allergies",
                    loader: dataDishesLoader,
                    element: <Allergies />,
                },
                {
                    path: "GenerateMenu",
                    element: <GenerateMenu offDays={offDays} setOffDays={setOffDays} />,
                },
            ],
        },
    ]);

    return (
        <AppContext.Provider value={{}}>
            <RouterProvider router={router} />
        </AppContext.Provider>
    );
}

export default App;
