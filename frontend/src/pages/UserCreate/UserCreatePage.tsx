import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateUserArea from "../../components/common/CreateUserArea/CreateUserArea";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import { getEditUser, getOneUser } from "../../store/Slices/usersSlice";

const UserCreatePage = () => {
    const dispatch: any = useDispatch();
    const { id } = useParams();
    let userData = useSelector(getEditUser);
    console.log("userData-=> ", userData)
    // if (id && !userData) {

    useEffect(() => {
        if (id) {
            dispatch(getOneUser(id));
        }
    }, [dispatch, id]);
    console.log('id -=-=-=> ', id)
    // dispatch(getOneUser(id));
    // }

    return (
        <>
            <Header />
            <CreateUserArea userData={userData} />
            <Footer />
        </>
    );
};

export default UserCreatePage;