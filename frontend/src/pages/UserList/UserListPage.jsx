import User from "../../components/User/User";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

import classes from "./UserListPage.module.css";
import SearchUserArea from "../../components/common/SearchUserArea/SearchUserArea";
import { useDispatch } from "react-redux";
// import { getAllUsers } from "../../services/api/user-api";
import { getUsersError, getUsersStatus, getUserList } from "../../store/Slices/usersSlice";


const UserListPage = props => {
    const dispatch = useDispatch();
    dispatch(getUserList())
    .then((originalPromiseResult) => {
        console.log('originalPromiseResult', originalPromiseResult)
      // handle result here
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
    })
    return (
        <>
            <Header />
            <div className={[classes["clearfix"], classes["user-list-area"]].join(" ")}>
                <p className={classes["total-user"]}>အသုံးပြုသူ စုစုပေါင်း "25" ယောက် ရှိပါသည်...
                </p>
                <SearchUserArea />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
            </div>

            <Footer />
        </>
    );
};

export default UserListPage;