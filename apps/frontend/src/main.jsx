import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Game from "./Game.jsx";
import GameIntro from "../GameIntro.jsx";
import Leaderboard from "./Leaderboard.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  { path: "/game", element: <Game /> },
  { path: "/gameIntro", element: <GameIntro /> },
  { path: "/leaderboard", element: <Leaderboard /> },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
