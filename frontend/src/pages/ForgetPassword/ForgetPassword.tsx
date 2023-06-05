import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { resetPassword, sendEmail } from '../../services/api/forgetPassword-api';
import classes from './ForgetPassword.module.css'
import Loading from '../../components/Loading/Loading';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const [mailAdres, setMail] = useState('');
    const [pwdInput, setPwd] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleEmailSend = async () => {
        setLoading(true);
        const data = {
            email: mailAdres
        }
        await sendEmail(data);
        setLoading(false);
        navigate('/login');
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
    }

    const handlePwdInput = (event: any) => {
        setPwd(event.target.value);
    }

    return (
        <div className={classes["create-user-area-component"]}>
            {
                isLoading ? 
                <Loading />
                : ''
            }
            <form className={classes["create-user-area-form"]}>
                {
                    !token ?
                        <>
                            <input name="email" placeholder="အီးမေးလ်..." onChange={handleMailInput} />
                            <button className={classes["create-user-btn"]} type="button" onClick={handleEmailSend}>
                                Email ပို့မည်...
                            </button>
                        </>
                        :
                        <>
                            <input type="password" placeholder="စကားဝှက်..." onChange={handlePwdInput} />

                            <input type="password" placeholder="စကားဝှက်ပြန် ရိုက်ထည့်ပါ..." />

                            <button className={classes["create-user-btn"]} type="button" onClick={handlePwdReset}>
                                ပြောင်းလဲမည်...
                            </button>
                        </>
                }

            </form>
        </div>
    );
}

export default ForgetPassword;