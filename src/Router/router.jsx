import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home";
import AddTransaction from "../Pages/AddTransaction";
import MyTransactions from "../Pages/MyTransactions";
import Reports from "../Pages/Reports";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "../Private/PrivateRoute";
import MyProfile from "../Pages/MyProfile";
import ViewDetails from "../Pages/ViewDetails";





const router = createBrowserRouter([
 {
    path: "/",
    Component: HomeLayout,
    children:[
        {
            path:'/',
            Component: Home,
        },
        {
            path: '/add-transaction',
            element: <PrivateRoute>
                <AddTransaction></AddTransaction>
            </PrivateRoute>,
        },
        {
            path: '/my-transactions',
            element:<PrivateRoute>
                <MyTransactions></MyTransactions>
            </PrivateRoute>,
            loader: () => fetch('http://localhost:3000/transaction')
        },
        {
            path: '/reports',
            element: <PrivateRoute>
                <Reports></Reports>
            </PrivateRoute>,
        },
        {
            path:'/login',
            Component: Login,
        },
        {
            path:'/signup',
            Component: SignUp
        },
        {
            path: '/my-profile',
            element: <PrivateRoute>
                <MyProfile></MyProfile>
            </PrivateRoute>
        },
        {
            path: '/view-details',
            element: <PrivateRoute>
                <ViewDetails></ViewDetails>
            </PrivateRoute>
        }
    ],
 }
]);

export default router;