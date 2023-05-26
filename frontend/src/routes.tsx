import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import App from "./App"
import SignUpPage from "./pages/SignUpPage";
import CardProfile from "./pages/Demo/UploadImagePage";
import ProfilePhotoUpload from "./pages/Demo/UploadImagePage";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/signup",
        element: <SignUpPage/>
    },
    {
        path: "/",
        element: <App />
    },
    {
        path: "/demo",
        element: <ProfilePhotoUpload />
    }
]);

export default router;