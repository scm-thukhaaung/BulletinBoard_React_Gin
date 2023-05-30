import { useTypewriter } from 'react-simple-typewriter';
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
            </form>
        </div>
    );
};

export default LoginPage;