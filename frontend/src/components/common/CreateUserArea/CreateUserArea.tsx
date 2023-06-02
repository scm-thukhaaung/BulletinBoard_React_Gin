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
import { UserInterface } from "../../../interfaces/UserInterface";
import { formatDate } from "../../../services/settings/dateFormatSvc";
import { createUser, updateUser } from "../../../store/Slices/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUserArea = (props: any) => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const [nameInput, setName] = useState('');
    const [emailInput, setEmail] = useState('');
    const [pwdInput, setPwd] = useState('');
    const [phoneInput, setPhone] = useState('');
    const [dateInput, setDate] = useState('');
    const [typeInput, setType] = useState('');
    const [adresInput, setAdres] = useState('');
    const userData: UserInterface = props?.userData;
    console.log(userData)
    let date;
    if (userData.ID) {
        date = formatDate(userData.Date_Of_Birth)
    }
    console.log('date-=> ', date)
    const [startDateInputType, setStartDateInputType] = useState('text');

    const startDateHandleFocus = () => {
        setStartDateInputType('date');
    };

    const startDateHandleBlur = () => {
        setStartDateInputType('text');
    };

    // Image upload
    const [selectedFile, setSelectedFile] = useState(null);
    const [nameInputError, setNameInputError] = useState(false);
    const fileInputRef: any = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameValue = event.target.value.trim();
        setName(nameValue);
        setNameInputError(nameValue === "");
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value.trim();
        setEmail(emailValue);
        // setNameInputError(nameValue === "");
    };
    const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pwdValue = event.target.value.trim();
        setPwd(pwdValue);
        // setNameInputError(nameValue === "");
    };
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneValue = event.target.value.trim();
        setPhone(phoneValue);
        // setNameInputError(nameValue === "");
    };
    const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dobValue = event.target.value;
        setDate(dobValue);
        // setNameInputError(nameValue === "");
    };
    const handleAdresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const adresValue = event.target.value;
        setAdres(adresValue);
        // setNameInputError(nameValue === "");
    };
    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const typeValue = event.target.value;
        setType(typeValue);
        // setNameInputError(nameValue === "");
    };

    const handleUpload = (name: string) => {
        if (selectedFile) {
            const file = fileInputRef.current.files[0];
            const fileBlob = new Blob([file], { type: file.type });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(fileBlob);
            link.download = {name}+'.png';
            link.click();
        }
    };

    const handleUpdate = async () => {
        handleUpload(nameInput);
        const data: UserInterface = {
            ID: userData.ID ? userData.ID : 0,
            Name: nameInput,
            Email: emailInput,
            Password: pwdInput,
            Phone: phoneInput,
            Date_Of_Birth: dateInput,
            Address: adresInput,
            Type: typeInput,
            Profile_Photo: "string",
            Created_User_ID: 1,
            Updated_User_ID: 1,
        }
        if (userData.ID) {
            await dispatch(updateUser(data));
            navigate('/userlist');
        }
    }
    const handleCreate = async () => {
        const data: UserInterface = {
            ID: 0,
            Name: nameInput,
            Email: emailInput,
            Password: pwdInput,
            Phone: phoneInput,
            Date_Of_Birth: dateInput,
            Address: adresInput,
            Type: typeInput,
            Profile_Photo: "string",
            Created_User_ID: 1,
            Updated_User_ID: 1,
        }
        await dispatch(createUser(data));
        navigate('/userlist');

    }
    return (
        <div className={classes["create-user-area-component"]}>
            <form className={classes["create-user-area-form"]}>
                <div className={classes["profile-photo-upload"]}>
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

                <input
                    name="name"
                    placeholder="အမည်..."
                    required
                    defaultValue={userData.Name ? userData.Name : ""}
                    onChange={handleNameChange}
                    className={nameInputError ? classes["error-input"] : ""}
                />
                {nameInputError && (
                    <span className={classes["error-message"]}>Name is required.</span>
                )}

                <input name="email" onChange={handleEmailChange} placeholder="အီးမေးလ်..." required defaultValue={userData.Email ? userData.Email : ''} />

                <input type="password" onChange={handlePwdChange} placeholder="စကားဝှက်..." required defaultValue={userData.Password ? userData.Password : ''} />

                <input type="password" placeholder="စကားဝှက်ပြန် ရိုက်ထည့်ပါ..." required defaultValue={userData.Password ? userData.Password : ''} />

                <input type="tel" onChange={handlePhoneChange} placeholder="(+95) ဖုန်းနံပါတ်..." defaultValue={userData.Phone ? userData.Phone : ''} />

                <input type={startDateInputType} onFocus={startDateHandleFocus}
                    onChange={handleDobChange}
                    defaultValue={userData.Date_Of_Birth ? date : ""}
                    onBlur={startDateHandleBlur} placeholder="မွေးနေ့..." />

                <input name="address" onChange={handleAdresChange} placeholder="လိပ်စာ..." required defaultValue={userData.Address ? userData.Address : ''} />

                <ThemeProvider theme={myDefaultTheme}>
                    <FormControl className={classes["fc-radio"]} >
                        <FormLabel id="types" sx={{ fontSize: "1.2em" }}>အသုံးပြုသူ အမျိုးအစား...</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="types"
                            name="row-radio-buttons-group"
                            defaultValue={userData.Type ? userData.Type : '1'}
                            onChange={handleTypeChange}
                            className={classes["radio-gp-div"]}
                        >
                            <FormControlLabel value="0" control={<Radio />} label={<Typography sx={{ fontSize: "1.2em" }}>Admin</Typography>} />
                            <FormControlLabel value="1" control={<Radio />} label={<Typography sx={{ fontSize: "1.2em" }}>User</Typography>} />

                        </RadioGroup>
                    </FormControl>
                </ThemeProvider>

                {
                    userData.ID ?
                        <button className={classes["create-user-btn"]} type="button" onClick={handleUpdate} >
                            Update
                        </button>
                        :
                        <button className={classes["create-user-btn"]} type="button" onClick={handleCreate} >
                            အကောင့်အသစ် ဖွင့်မည်...
                        </button>
                }

            </form>
        </div>
    );
};

export default CreateUserArea;