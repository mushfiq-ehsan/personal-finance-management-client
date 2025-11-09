import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home/Home";





const router = createBrowserRouter([
 {
    path: "/",
    Component: HomeLayout,
    children:[
        {
            path:'/',
            Component: Home,
        }
    ],
 }
]);

export default router;