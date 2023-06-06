import React, { useEffect, useState } from "react";
import User from "../../components/User/User";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

import classes from "./UserListPage.module.css";
import SearchUserArea from "../../components/common/SearchUserArea/SearchUserArea";
import { useSelector } from "react-redux";
import { getuserListData, getuserListSts } from "../../store/Slices/usersSlice";
import { UserInterface } from "../../interfaces/UserInterface";
import Loading from "../../components/Loading/Loading";
import { Message } from "../../consts/Message";
import CommonDialog from "../../components/common/CommonDialog/CommonDialog";

const UserListPage = () => {
    const storedList = useSelector(getuserListData);
    const listCondition = useSelector(getuserListSts);
    const [isLoading, setLoading] = useState(false);
    const [fetchErr, setFetchErr] = useState('');

    useEffect(() => {
        if (listCondition === "idle" || listCondition === "loading") {
            setLoading(true);
        } else if (listCondition === "failed") {
            setFetchErr(Message.notFetchUserList);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [listCondition]);

    const UserList = () => {
        return storedList.map((eachUser: UserInterface) => {
            return (<User userData={eachUser} key={eachUser.ID + eachUser.Name} />)
        })
    }

    const handleCloseDialog = () => {
        setFetchErr('');
    }

    return (
        <>
            <Header />
            {isLoading && <Loading />}
            {listCondition === 'failed' && <CommonDialog message={fetchErr} onClick={handleCloseDialog} />}
            <div className={[classes["clearfix"], classes["user-list-area"]].join(" ")}>
                <p className={classes["total-user"]}>အသုံးပြုသူ စုစုပေါင်း "{storedList.length}" ယောက် ရှိပါသည်...</p>
                {/* <SearchUserArea /> */}
                <div className={classes["user-list-con"]}>
                    <UserList />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserListPage;
