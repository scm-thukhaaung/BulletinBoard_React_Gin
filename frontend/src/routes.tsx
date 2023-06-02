import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import UserListPage from "./pages/UserList/UserListPage";
import UserCreatePage from "./pages/UserCreate/UserCreatePage";
import HomePage from "./pages/Home/HomePage";
import PostCsvPage from "./pages/postCsv/PostCsvPage";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
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
        element: <HomePage/>
    },
    {
        path: "/userlist",
        element: <UserListPage />
    },
    {
        path: "/create-user",
        element: <UserCreatePage />
    },
    {
        path: "/csv-posts",
        element: <PostCsvPage />
    },
    {
        path: "/forget-password",
        element: <ForgetPassword />
    }
]);

export default router;