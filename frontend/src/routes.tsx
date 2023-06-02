import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import App from "./App";
import SignUpPage from "./pages/SignUp/SignUpPage";
import UserCreatePage from "./pages/UserCreate/UserCreatePage";
import UserListPage from "./pages/UserList/UserListPage";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignUpPage />
    },
    {
        path: "/",
        element: <App />
    },
    {
        path: "/userlist",
        element: <UserListPage />
    },
    // {
    //     path: "/create-user",
    //     element: <UserCreatePage />
    // },
    {
        path: "/users/:id",
        element: <UserCreatePage />
    },
    {
        path: "/users",
        element: <UserCreatePage />
    }

]);

export default router;