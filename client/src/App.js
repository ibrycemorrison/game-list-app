import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Game from "./pages/Game/Game.jsx";
import GameList from "./pages/GameList/GameList.jsx";
import Browse from "./pages/Browse/Browse.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import Topbar from "./components/Topbar/Topbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import { changeTheme } from "./components/Footer/Footer.jsx";
import "./main.scss";
// import { useEffect } from "react";

// Create general Layout for a page with a Topbar and Footer
const Layout = () => {
  return (
    <>
      <Topbar />
      <div className="page-content">
        <div className="outletcontainer">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

// Create our page router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/game/:id",
        element: <Game />,
      },
      {
        path: "/gamelist",
        element: <GameList />,
      },
      {
        path: "/games",
        element: <Browse />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

/**
 *
 * @returns Main App HTML
 */
function App() {
  // TODO Update or remove ...
  // useEffect to set theme color on page load
  // useEffect(() => {
  //   changeTheme(localStorage.getItem("theme-color"));
  // }, []);

  // Return a div with our router
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
