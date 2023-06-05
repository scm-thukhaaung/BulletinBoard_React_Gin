import React, { useEffect } from "react";
import User from "../../components/User/User";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

import classes from "./UserListPage.module.css";
import SearchUserArea from "../../components/common/SearchUserArea/SearchUserArea";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, getuserListData, getuserListSts } from "../../store/Slices/usersSlice";
import { UserInterface } from "../../interfaces/UserInterface";

const UserListPage = () => {
    const dispatch: any = useDispatch();
    const storedList = useSelector(getuserListData);
    const listCondition = useSelector(getuserListSts);

    useEffect(() => {
        dispatch(getUserList());
    }, [dispatch]);

    if (listCondition === "idle" || listCondition === "loading") {
        // Loading state while fetching data
        return <div>Loading...</div>;
    }

    if (listCondition === "failed") {
        // Handling error state
        return <div>Error occurred while fetching user data.</div>;
    }

    const UserList = () => {
        return storedList.map((eachUser: UserInterface) => {
            if (listCondition === "idle" || listCondition === "loading") {
                return <>loading</>

            }
            return (<User userData={eachUser} key={eachUser.ID + eachUser.Name}/>)
        })
    }

    return (
        <>
            <Header />
            <div className={[classes["clearfix"], classes["user-list-area"]].join(" ")}>
                <p className={classes["total-user"]}>အသုံးပြုသူ စုစုပေါင်း "{storedList.length}" ယောက် ရှိပါသည်...</p>
                <SearchUserArea />
                <div className={classes["user-list-con"]}>
                    <UserList />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserListPage;
