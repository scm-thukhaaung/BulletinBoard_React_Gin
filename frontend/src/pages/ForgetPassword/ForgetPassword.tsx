import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { resetPassword, sendEmail } from '../../services/api/forgetPassword-api';
import classes from './ForgetPassword.module.css'
import Loading from '../../components/Loading/Loading';
import { Message } from '../../consts/Message';
import CommonDialog from '../../components/common/CommonDialog/CommonDialog';
import { Constant } from '../../consts/Constant';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const [mailAdres, setMail] = useState('');
    const [pwdInput, setPwd] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [forPwdError, setForPwdError] = useState('');
    const [emailErr, setEmailErr] = useState(true);
    const [pwdErr, setPwdErr] = useState(true);
    const [matchErr, setMatchErr] = useState(true);

    const handleEmailSend = async () => {
        setLoading(true);
        const data = {
            email: mailAdres
        }
        try {
            await sendEmail(data);
            setLoading(false);
            navigate('/login');
        } catch {
            setLoading(false);
            setForPwdError(Message.notSendEmail)
        }
    }

    const handlePwdReset = async () => {
        setLoading(true);
        const data = {
            password: pwdInput
        }
        await resetPassword(data, token);
        setLoading(false);
        navigate('/login');
    }

    const handleMailInput = (event: any) => {
        setMail(event.target.value);
        if(!event.target.value || !Constant.emailRegExp.test(event.target.value)) {
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }
    }

    const handlePwdInput = (event: any) => {
        setPwd(event.target.value);
        if(!event.target.value) {
            setPwdErr(true);
        } else {
            setPwdErr(false);
        }
    }

    const handleConfirmPwdInput = (event: any) => {
        if(event.target.value !== pwdInput) {
            setMatchErr(true);
        } else {
            setMatchErr(false);
        }
    }

    const handleCloseDialog = () => {
        setForPwdError('');
        
    }

    const checkDisable = () => {
        if (emailErr) {
            return true;
        } else {
            return false;
        }
    }

    const checkPwdDisable = () => {
        if (pwdErr || matchErr) {
            return true;
        } else {
            return false;
        }
    }
    
    return (
        <div className={classes["create-user-area-component"]}>
            {
                isLoading ?
                    <Loading />
                    : ''
            }
            {forPwdError && <CommonDialog message={forPwdError} onClick={handleCloseDialog} />}
            <form className={classes["create-user-area-form"]}>
                {
                    !token ?
                        <>
                            <input name="email" placeholder="အီးမေးလ်..." onChange={handleMailInput} />
                            <button className={classes["create-user-btn"]} type="button" onClick={handleEmailSend} disabled={checkDisable()}>
                                Email ပို့မည်...
                            </button>
                        </>
                        :
                        <>
                            <input type="password" placeholder="စကားဝှက်..." onChange={handlePwdInput} />

                            <input type="password" placeholder="စကားဝှက်ပြန် ရိုက်ထည့်ပါ..." onChange={handleConfirmPwdInput}/>

                            <button className={classes["create-user-btn"]} type="button" onClick={handlePwdReset}  disabled={checkPwdDisable()}>
                                ပြောင်းလဲမည်...
                            </button>
                        </>
                }

            </form>
        </div>
    );
}

export default ForgetPassword;