import post from '../../services/api/post-api';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Typography, ThemeProvider } from '@mui/material';
import classes from "./User.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { FontTheme } from '../common/custom_mui/CustomMUI';


const User = props => {

    return (
        <>

            <div className={classes["user-card-component"]}>

                <div className={classes["circle-center"]}>
                    <div className={classes["circle-container"]}>
                        <img src="https://asianwiki.com/images/9/9d/Lee_Min-Ho-p2.jpg" alt="Your Image" className={classes["circle-image"]} />
                    </div>
                </div>
                <p className={classes["name"]}>" သုခအောင် "</p>
                <div className={classes["user-infos"]}>

                    <p>အိုင်ဒီ</p>
                    <p>01234</p>

                    <p>အီးမေးလ်</p>
                    <p>scm.thukhaaung@gmail.com</p>


                    <p>အမျိုးအစား</p>
                    <p>Admin</p>


                    <p>ဖုန်းနံပါတ်</p>
                    <p>T09796602733</p>


                    <p>မွေးနေ့</p>
                    <p>16.7.1998</p>


                    <p>နေရပ်လိပ်စာ</p>
                    <p>Pyay</p>

                </div>
                <button className={classes["user-delete-btn"]}>
                    <DeleteIcon />
                </button>
                <button className={classes["user-update-btn"]}>
                    <EditIcon />
                </button>
            </div>
        </>
    );
};

export default User;