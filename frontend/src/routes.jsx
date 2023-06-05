import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import UserCreatePage from "./pages/UserCreate/UserCreatePage";
import HomePage from "./pages/Home/HomePage";
import PostCsvPage from "./pages/PostCsv/PostCsvPage";
import { getAllPosts } from "./store/Slices/postsSlice";
import Auth from "./services/settings/isAuth";
import Admin from "./services/settings/isAdmin";
import store from "./store/store";
import UserListPage from "./pages/UserList/UserListPage";
import { getOneUser } from "./store/Slices/usersSlice";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import UserCsvPage from "./pages/UserCsv/UserCsvPage";


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
        element:
            <Auth>
                <Admin>
                    <UserListPage />
                </Admin>
            </Auth>
    },
    {
        path: "/users/:id",
        element:
            <Auth>
                <Admin>
                    <UserCreatePage />
                </Admin>
            </Auth>,
        loader: ({ params }) => {
            return store.dispatch(getOneUser(params.id));
        },
    },
    {
        path: "/users",
        element:
            <Auth>
                <Admin>
                    <UserCreatePage />
                </Admin>
            </Auth>,
    },
    {
        path: "/csv-posts",
        element:
            <Auth>
                <PostCsvPage />
            </Auth>
    },
    {
        path: "/forget-password",
        element:
            <Auth>
                <ForgetPassword />
            </Auth>
    },
    {
        path: "/csv-users",
        element:
            <Auth>
                <UserCsvPage />
            </Auth>
    }

]);

export default router;