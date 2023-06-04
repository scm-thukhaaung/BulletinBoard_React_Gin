import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import App from "./App";
import SignUpPage from "./pages/SignUp/SignUpPage";
import UserListPage from "./pages/UserList/UserListPage";
import UserCreatePage from "./pages/UserCreate/UserCreatePage";
import HomePage from "./pages/Home/HomePage";
import PostCsvPage from "./pages/PostCsv/PostCsvPage";
import { getAllPosts, selectAllPosts } from "./store/Slices/postsSlice";
import Auth from "./services/settings/isAuth";
import store from "./store/store";

const PostLoader = () => store.dispatch(getAllPosts());
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
        element: <>
            <Auth>
                <HomePage />
            </Auth>
        </>,
        loader: PostLoader,
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
    }
]);

export default router;