import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypewriter } from 'react-simple-typewriter';
import Loading from '../../components/Loading/Loading';
import { Constant } from '../../consts/Constant';
import { createUser } from '../../store/Slices/usersSlice';
import classes from './SignUpPage.module.css';

const SignUpPage = (props: any) => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const [nameVal, setName] = useState('');
    const [emailVal, setEmail] = useState('');
    const [pwdVal, setPwd] = useState('');
    const [confirmPwdVal, setConPwd] = useState('');
    const [matchErr, setMatchErr] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(false);

    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'ဘူလတင် ဘုတ်ပါ'],
        loop: false
    });

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
        if (!Constant.emailRegExp.test(event.target.value)) {
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }
    }

    const handlePwdChange = (event: any) => {
        setPwd(event.target.value);
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
        await dispatch(createUser(userData));
        setLoading(false);
        navigate('/login');
    }

    return (
        <div>
            {
                isLoading && <Loading />
            }
            <h1 className={classes["hdr"]}>
                " {text} "
            </h1>
            <form className={classes["signup-form"]}>
                <input name="name" placeholder="အမည်" onChange={handleNameChange} />

                <input name="email" placeholder="အီးမေးလ်" onChange={handleEmailChange} />

                <input type="password" placeholder="စကားဝှက်" onChange={handlePwdChange} />

                <input type="password" placeholder="စကားဝှက်ပြန် ရိုက်ထည့်ပါ..." onChange={handleConfirmPwd} />

                <button className={classes["signup-btn"]} type="button" onClick={handleSignUp} disabled={checkDisable()}>
                    အကောင့်အသစ် ဖွင့်မည်...
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;