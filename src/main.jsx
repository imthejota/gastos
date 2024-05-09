import { createRoot } from "react-dom/client";
import "./styles/main.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes";


const $root = document.getElementById("root");
const root = createRoot($root);
root.render(
  <>
    <RouterProvider router={routes} />
  </>
);
