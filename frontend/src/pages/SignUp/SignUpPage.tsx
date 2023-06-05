import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypewriter } from 'react-simple-typewriter';
import CommonDialog from '../../components/common/CommonDialog/CommonDialog';
import Loading from '../../components/Loading/Loading';
import { Constant } from '../../consts/Constant';
import { Message } from '../../consts/Message';
import { createUser } from '../../store/Slices/usersSlice';
import classes from './SignUpPage.module.css';

const SignUpPage = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const [nameVal, setName] = useState('');
    const [emailVal, setEmail] = useState('');
    const [pwdVal, setPwd] = useState('');
    const [confirmPwdVal, setConPwd] = useState('');
    const [matchErr, setMatchErr] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const [pwdErr, setPwdErr] = useState(false);
    const [signUpErr, setSignUpErr] = useState('');

    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'ဘူလတင် ဘုတ်ပါ'],
        loop: false
    });

    const handleNameChange = (event: any) => {
        setName(event.target.value);
        if (!event.target.value) {
            setNameErr(true);
        } else {
            setNameErr(false);
        }
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
        if (!Constant.emailRegExp.test(event.target.value) || !event.target.value) {
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }
    }

    const handlePwdChange = (event: any) => {
        setPwd(event.target.value);
        if (!event.target.value) {
            setPwdErr(true);
        } else {
            setPwdErr(false);
        }
    }

    const handleConfirmPwd = (event: any) => {
        setConPwd(event.target.value);
        if (pwdVal !== event.target.value) {
            setMatchErr(true);
        } else {
            setMatchErr(false);
        }
    }

    const checkDisable = () => {
        if (!nameVal || !emailVal || !pwdVal || !confirmPwdVal || matchErr || emailErr) {
            return true;
        } else {
            return false;
        }
    }

    const handleSignUp = async () => {
        setLoading(true);
        const userData = {
            Name: nameVal,
            Email: emailVal,
            Password: pwdVal,
            Type: "1",
            Created_User_ID: 1000,
            Updated_User_ID: 1000,
        }
        try {
            await dispatch(createUser(userData));
            setLoading(false);
            navigate('/login');
        } catch {
            setLoading(false);
            setSignUpErr(Message.notSignUp)
        }
    }

    const handleCloseDialog = () => {
        setSignUpErr('');
    }

    return (
        <div>
            {
                isLoading && <Loading />
            }
            {signUpErr && <CommonDialog message={signUpErr} onClick={handleCloseDialog} />}
            <h1 className={classes["hdr"]}>
                " {text} "
            </h1>
            <form className={classes["signup-form"]}>
                <div className={classes['input-con']}>
                    <input name="name" placeholder="အမည်" onChange={handleNameChange} />
                    {
                        nameErr && <span> အမည်ကိုဖြည့်ပါ။ </span>
                    }
                </div>

                <div className={classes['input-con']}>
                    <input name="email" placeholder="အီးမေးလ်" onChange={handleEmailChange} />
                    {
                        emailErr && <span> မှန်ကန်သောအီးမေးလ်ကိုဖြည့်ပါ။ </span>
                    }
                </div>

                <div className={classes['input-con']}>
                    <input type="password" placeholder="စကားဝှက်" onChange={handlePwdChange} />
                    {
                        pwdErr && <span> စကားဝှက်ကိုဖြည့်ပါ။ </span>
                    }
                </div>

                <div className={classes['input-con']}>
                    <input type="password" placeholder="စကားဝှက်ပြန် ရိုက်ထည့်ပါ..." onChange={handleConfirmPwd} />
                    {
                        matchErr && <span> စကားဝှက် မကိုက်ညီပါ။ </span>
                    }
                </div>

                <button className={classes["signup-btn"]} type="button" onClick={handleSignUp} disabled={checkDisable()}>
                    အကောင့်အသစ် ဖွင့်မည်...
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;