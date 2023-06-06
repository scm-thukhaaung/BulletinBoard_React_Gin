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
import { Message } from "../../consts/Message";

const LoginPage = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [loginError, setLoginErr] = useState(false);
    const [switchVal, setSwitch] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(true);
    const [pwdErr, setPwdErr] = useState(true);

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (!event.target.value) {
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }
    };

    const handlePwd = (event: ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value);
        if (!event.target.value) {
            setPwdErr(true);
        } else {
            setPwdErr(false);
        }
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

    const checkDisable = () => {
        if (emailErr || pwdErr) {
            return true;
        } else {
            return false;
        }
    }

    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'ဘူလတင် ဘုတ်ပါ'],
        loop: false
    });

    const handleSwitch = () => {
        localStorage.setItem('rememberMe', String(!switchVal));
        setSwitch(!switchVal);
    }
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
                    <FormControlLabel checked={switchVal} control={<GoldenSwitch />} onChange={handleSwitch} label={<Typography sx={{ fontFamily: "UMoe", fontSize: "1.2em" }}>မှတ်မိပေးပါ...</Typography>} />

                    <a className={classes["forgot-pwd"]} href='/forget-password'>စကားဝှက်မေ့သွားပြီလား...?</a>
                </div>
                <button className={classes["login-btn"]} onClick={handleLogin} type="button" disabled={checkDisable()}>
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