import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from "react";

import RootLayout from "./pages/Root.jsx";
import Home from "./pages/Home.jsx";
import Allergies from "./pages/Allergies.jsx";
import dataDishesLoader from "./data/dishes.js";
import GenerateMenu from "./pages/GenerateMenu.jsx";
import Login from "./pages/Login.jsx";

export const AppContext = createContext([]);

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,

            children: [
                {
                    path: "",
                    loader: dataDishesLoader,
                    element: <Home />,
                },
                {
                    path: "Allergies",
                    loader: dataDishesLoader,
                    element: <Allergies />,
                },
                {
                    path: "GenerateMenu",
                    loader: dataDishesLoader,
                    element: <GenerateMenu />,
                },
                {
                    path: "Login",
                    element: <Login />,
                }
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
