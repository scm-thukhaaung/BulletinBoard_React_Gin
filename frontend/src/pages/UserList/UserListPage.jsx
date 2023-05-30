import User from "../../components/User/User";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

import classes from "./UserListPage.module.css";
import SearchUserArea from "../../components/common/SearchUserArea/SearchUserArea";

const UserListPage = props => {
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