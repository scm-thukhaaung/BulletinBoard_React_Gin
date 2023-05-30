import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import App from "./App"
import PostCsvPage from "./pages/postCsv/PostCsvPage";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/",
        element: <App />
    },
    {
        path: "/csv-posts",
        element: <PostCsvPage />
    }
]);

export default router;