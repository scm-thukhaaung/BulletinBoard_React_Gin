import { ChangeEvent, useState } from "react";
import { FormControlLabel, Typography } from '@mui/material';
import { useTypewriter } from 'react-simple-typewriter';
import { GoldenSwitch } from '../../components/common/custom_mui/CustomMUI';
import classes from './LoginPage.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, getAuthStatus } from "../../store/Slices/authSlice";

const LoginPage = (props: any) => {
    const dispatch: any = useDispatch();
    const apiLoginStatus = useSelector(getAuthStatus);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePwd = (event: ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value);
    };

    const handleLogin = async () => {
        const data = {
            Email: email,
            Password: pwd
        };
        const result = await dispatch(authenticate(data)).unwrap();
        console.log('result==> ', result);
        if (result?.data?.User) {
            navigate('/');
        }
    };

    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'ဘူလတင် ဘုတ်ပါ'],
        loop: false
    });
    return (
        <div>
            {apiLoginStatus}
            <h1 className={classes["hdr"]}>
                " {text} "
            </h1>
            <form className={classes["login-form"]}>
                <input name="email" placeholder="အီးမေးလ်" onChange={(event) => handleEmail(event)} />

                <input type="password" placeholder="စကားဝှက်" onChange={(event) => handlePwd(event)} />

                <div className={classes["mini-div"]}>
                    <FormControlLabel control={<GoldenSwitch />} label={<Typography sx={{ fontFamily: "UMoe", fontSize: "1.2em" }}>မှတ်မိပေးပါ...</Typography>} />

                    <a className={classes["forgot-pwd"]} href='/'>စကားဝှက်မေ့သွားပြီလား...?</a>
                </div>
                <button className={classes["login-btn"]} onClick={handleLogin} type="button">
                    လော့အင်ဝင်မည်...
                </button>
                <a className={classes["create-account"]} href='/signup'>
                    အကောင့်အသစ် ဖွင့်မလား...?
                </a>
            </form>
        </div>
    );
};

export default LoginPage;