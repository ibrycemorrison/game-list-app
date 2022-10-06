import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameList from "./pages/GameList";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import "./main.scss";

// Create general Layout for a page with a Topbar and Footer
const Layout = () => {
  return (
    <>
      <Topbar />
      <div className="outletcontainer">
        <Outlet />
      </div>
      <Footer />
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
        path: "/game/:slug",
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

function App() {
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
