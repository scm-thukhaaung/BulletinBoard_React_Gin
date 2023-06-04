import { ChangeEvent, useState } from "react";
import { FormControlLabel, Typography } from '@mui/material';
import { useTypewriter } from 'react-simple-typewriter';
import { GoldenSwitch } from '../../components/common/custom_mui/CustomMUI';
import classes from './LoginPage.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/Slices/authSlice";
import CommonDialog from "../../components/common/CommonDialog/CommonDialog";
import Loading from "../../components/Loading/Loading";
import { Message } from "../../consts/message";

const LoginPage = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [loginError, setLoginErr] = useState(false)
    const [isLoading, setLoading] = useState(false);

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePwd = (event: ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value);
    };

    const handleLogin = async () => {
        setLoading(true);
        const data = {
            Email: email,
            Password: pwd
        };
        try{
            const result = await dispatch(authenticate(data)).unwrap();
            setLoading(false);
            if (result?.data?.User) {
                navigate('/');
            }
        } catch {
            setLoading(false);
            setLoginErr(true);
        }
    };

    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'ဘူလတင် ဘုတ်ပါ'],
        loop: false
    });
    return (
        <div>
            { isLoading && <Loading/>}
            {
                loginError && <CommonDialog message={Message.loginError} onClick={()=>{
                    setLoginErr(false);
                }} />
            }
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