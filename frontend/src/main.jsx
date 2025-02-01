import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import HomePage from './pages/HomePage.jsx';
import Summary from "./pages/Summary.jsx";
import LongVideo from "./pages/LongVideo.jsx";
import ShortVideo from "./pages/ShortVideo.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="summary" element={<Summary />} />
      <Route path="long-video" element={<LongVideo />} />
      <Route path="short-video" element={<ShortVideo />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
