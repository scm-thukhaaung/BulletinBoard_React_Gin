import { FormControlLabel, Typography } from '@mui/material';
import { useTypewriter } from 'react-simple-typewriter';
import { GoldenSwitch } from '../../components/common/custom_mui/CustomMUI';
import classes from './LoginPage.module.css';

const LoginPage = (props: any) => {

    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'ဘူလတင် ဘုတ်ပါ'],
        loop: false
    });
    return (
        <div>
            <h1 className={classes["hdr"]}>
                " {text} "
            </h1>
            <form className={classes["login-form"]}>
                <input name="email" placeholder="အီးမေးလ်" />

                <input type="password" placeholder="စကားဝှက်" />

                <div className={classes["mini-div"]}>
                    <FormControlLabel control={<GoldenSwitch />} label={<Typography sx={{ fontFamily: "UMoe", fontSize: "1.2em" }}>မှတ်မိပေးပါ...</Typography>} />

                    <a className={classes["forgot-pwd"]} href='/'>စကားဝှက်မေ့သွားပြီလား...?</a>
                </div>
                <button className={classes["login-btn"]} type="button">
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