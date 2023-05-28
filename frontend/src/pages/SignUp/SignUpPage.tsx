import { useTypewriter } from 'react-simple-typewriter';
import classes from './SignUpPage.module.css';

const SignUpPage = (props: any) => {
    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'ဘူလတင် ဘုတ်ပါ'],
        loop: false
    });

    return (
        <div>
            <h1 className={classes["hdr"]}>
                " {text} "
            </h1>
            <form className={classes["signup-form"]}>
                <input name="name" placeholder="အမည်" />

                <input name="email" placeholder="အီးမေးလ်" />

                <input type="password" placeholder="စကားဝှက်" />

                <input type="password" placeholder="စကားဝှက်ပြန် ရိုက်ထည့်ပါ..." />

                <button className={classes["login-btn"]} type="button">
                    အကောင့်အသစ် ဖွင့်မည်...
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;