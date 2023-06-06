import { Navigate } from "react-router-dom";
import store from "../../store/store";

const Admin = ({ children }) => {
    const adminType = store.getState().auth.type;

    if (adminType !== "admin") {
        return <Navigate to='/' />
    }
    return children;
}

export default Admin;