import { useTypewriter } from 'react-simple-typewriter'
import "../../css/style.css";

const Header = () => {
    const [text] = useTypewriter({
        words: ['ရင်ဖွင့်ပါ', 'ရင်ဖွင့်ရာ', 'ဘူလတင် ဘုတ်ပါ'],
        loop: false
    });

    return (
        <header className="hdr">
            <h1 className="h1-txt-1">
                " {text} "
            </h1>
        </header>
    );
};

export default Header;