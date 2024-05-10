import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import App from "./pages/App";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Login from "./pages/Login";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [
            { index: true, element: <App /> },
            {
                path: "create",
                element: <Create />,
            },
            {
                path: "edit/:id",
                element: <Edit />,
            }
        ],
    },
    {
        path: "/login",
        element: <Login />,
    }
]);

export default routes;
