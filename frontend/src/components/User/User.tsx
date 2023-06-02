import classes from "./User.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { UserInterface } from '../../interfaces/UserInterface';
import profile from "../../static/img/volunteer.png"
import { formatDate } from "../../services/settings/dateFormatSvc";
import { useDispatch } from "react-redux";
import { deleteFromList, userSliceAction } from "../../store/Slices/usersSlice";
import { useNavigate } from "react-router-dom";

const User = (props: { userData: UserInterface; }) => {
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    // const { userData, key } = props;
    const userData = props.userData;
    // console.log('userData-=-=> ', userData)
    const profilePicUrl = userData.Profile_Photo || profile;
    let formattedDate;
    if (userData.Date_Of_Birth) {
        formattedDate = formatDate(userData.Date_Of_Birth);
    }

    const handleDelete = () => {
        dispatch(deleteFromList(userData.ID)).unwrap();
    }

    const handleUpdate = () => {
        dispatch(userSliceAction.setEditMode(userData));
        navigate('/users/'+userData.ID);
    }

    return (
        <>
            <div className={classes["user-card-component"]} key={userData.ID + userData.Name}>
                <div className={classes["circle-center"]}>
                    <div className={classes["circle-container"]}>
                        <img src={profilePicUrl} alt="Profile" className={classes["circle-image"]} />
                    </div>
                </div>
                <p className={classes["name"]}>{userData.Name}</p>
                <div className={classes["user-infos"]}>

                    <p>အိုင်ဒီ</p>
                    <p>{userData.ID}</p>

                    <p>အီးမေးလ်</p>
                    <p>{userData.Email}</p>

                    <p>အမျိုးအစား</p>
                    {
                        userData.Type === "0" ?
                            <p>Admin</p>
                            :
                            <p>Member</p>

                    }

                    <p>ဖုန်းနံပါတ်</p>
                    <p>{userData.Phone ? userData.Phone : "-"}</p>

                    <p>မွေးနေ့</p>
                    <p>{userData.Date_Of_Birth ? formattedDate : "-"}</p>

                    <p>နေရပ်လိပ်စာ</p>
                    <p>{userData.Address ? userData.Address : "-"}</p>

                </div>
                <button className={classes["user-delete-btn"]} onClick={handleDelete}>
                    <DeleteIcon />
                </button>
                <button className={classes["user-update-btn"]} onClick={handleUpdate}>
                    <EditIcon />
                </button>
            </div>
        </>
    );
};

export default User;
