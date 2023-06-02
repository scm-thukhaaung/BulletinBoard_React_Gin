import { useState, useRef } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import classes from "./CreateUserArea.module.css";
import { ThemeProvider } from "@emotion/react";
import { myDefaultTheme } from "../custom_mui/CustomMUI";
import { Typography } from "@mui/material";

const CreateUserArea = () => {
    const [startDateInputType, setStartDateInputType] = useState('text');

    const startDateHandleFocus = () => {
        setStartDateInputType('date');
    };

    const startDateHandleBlur = () => {
        setStartDateInputType('text');
    };
    // Image upload
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        // Logic for uploading the selected file
        // You can make an API call here or perform any other necessary operations
        console.log('Uploading file:', selectedFile);
    };
    return (
        <div className={classes["create-user-area-component"]}>
            <form className={classes["create-user-area-form"]}>
                <div className={classes["profile-photo-upload"]}>
                    {/* <h3>Profile Photo Upload</h3> */}
                    <div
                        className={classes["image-section"]}
                        onClick={handleFileClick}
                        style={{ backgroundImage: selectedFile ? `url(${URL.createObjectURL(selectedFile)})` : 'none' }}
                    >
                        {!selectedFile && <span>ပုံရွေးရန် click နှိပ်ပါ...</span>}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                </div>

                <input name="name" placeholder="အမည်..." />

                <input name="email" placeholder="အီးမေးလ်..." />

                <input type="password" placeholder="စကားဝှက်..." />

                <input type="password" placeholder="စကားဝှက်ပြန် ရိုက်ထည့်ပါ..." />

                <input type="tel" placeholder="(+95) ဖုန်းနံပါတ်..." />

                <input type={startDateInputType} onFocus={startDateHandleFocus}
                    onBlur={startDateHandleBlur} placeholder="မွေးနေ့..." />

                <ThemeProvider theme={myDefaultTheme}>
                    <FormControl className={classes["fc-radio"]}>
                        <FormLabel id="types" sx={{ fontSize: "1.2em" }}>အသုံးပြုသူ အမျိုးအစား...</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="types"
                            name="row-radio-buttons-group"
                            defaultValue="1"
                            className={classes["radio-gp-div"]}
                        >
                            <FormControlLabel value="0" control={<Radio />} label={<Typography sx={{ fontSize: "1.2em" }}>Admin</Typography>} />
                            <FormControlLabel value="1" control={<Radio />} label={<Typography sx={{ fontSize: "1.2em" }}>User</Typography>} />

                        </RadioGroup>
                    </FormControl>
                </ThemeProvider>

                <button className={classes["create-user-btn"]} type="button" onClick={handleUpload} disabled={!selectedFile}>
                    အကောင့်အသစ် ဖွင့်မည်...
                </button>
            </form>
        </div>
    );
};

export default CreateUserArea;