import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from "react";
import RootLayout from "./pages/Root.jsx";
import Home from "./pages/Home.jsx";
import Allergies from "./pages/Allergies.jsx";
import { dishesLoader } from "./pages/Allergies.jsx";

export const AppContext = createContext([]);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,

      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "Allergies",
          loader: dishesLoader,
          element: <Allergies />,
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
