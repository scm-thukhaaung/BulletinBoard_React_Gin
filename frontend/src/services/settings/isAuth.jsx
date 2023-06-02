import { Navigate } from "react-router-dom";
import store from "../../store/store";

const Auth = ({ children }) => {
    const auth = store.getState().auth;

    if (!auth.authData?.User) {
        return <Navigate to='/login' />;
    }
    return children;
};

export default Auth;