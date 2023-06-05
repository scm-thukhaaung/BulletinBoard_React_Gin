import { useState, useRef, useEffect } from "react";
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
import { createUser, getEditUser, getuserListSts, updateUser } from "../../../store/Slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Message } from "../../../consts/Message";
import Loading from "../../Loading/Loading";
import CommonDialog from "../CommonDialog/CommonDialog";

const CreateUserArea = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const [photoInput, setPhoto] = useState('');
    const [nameInput, setName] = useState('');
    const [emailInput, setEmail] = useState('');
    const [pwdInput, setPwd] = useState('');
    const [phoneInput, setPhone] = useState('');
    const [dateInput, setDate] = useState('');
    const [typeInput, setType] = useState('');
    const [adresInput, setAdres] = useState('');
    const [startDateInputType, setStartDateInputType] = useState('text');

    // Image upload
    const [selectedFile, setSelectedFile] = useState(null);
    const [nameInputError, setNameInputError] = useState(false);
    const fileInputRef: any = useRef(null);

    const userData = useSelector(getEditUser);

    const apiUserStatus = useSelector(getuserListSts);
    const [isLoading, setLoading] = useState(false);
    const [userError, setUserErr] = useState('');
    useEffect(() => {
        if (userData.ID) {
            const formattedDate = formatDate(userData.Date_Of_Birth);
            setDate(formattedDate);
        }
        if (apiUserStatus === "idle" || apiUserStatus === "loading") {
            setLoading(true);
        } else if (apiUserStatus === "failed") {
            setUserErr(Message.notCreateUser);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [apiUserStatus, selectedFile, userData]);
    const startDateHandleFocus = () => {
        setStartDateInputType('date');
    };

    const startDateHandleBlur = () => {
        setStartDateInputType('text');
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const getBase64 = (imageFile: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = (reader.result as string).split(",")[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(imageFile);
        });
    }

    const handleFileChange = (event: any) => {
        setPhoto('');
        const fileList = event.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                getBase64(file).then((data: any) => setPhoto(data));
            } else {
                setUserErr(Message.notAnImage)
            }
        }
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
    };
    const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pwdValue = event.target.value.trim();
        setPwd(pwdValue);
    };
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneValue = event.target.value.trim();
        setPhone(phoneValue);
    };
    const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dobValue = event.target.value;
        setDate(dobValue);
    };
    const handleAdresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const adresValue = event.target.value;
        setAdres(adresValue);
    };
    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const typeValue = event.target.value;
        setType(typeValue);
    };

    const handleUpdate = async () => {
        const data: UserInterface = {
            ID: userData.ID ? userData.ID : 0,
            Name: nameInput,
            Email: emailInput,
            Password: pwdInput,
            Phone: phoneInput,
            Date_Of_Birth: dateInput,
            Address: adresInput,
            Type: typeInput,
            Profile_Photo: photoInput,
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
            Profile_Photo: photoInput,
            Created_User_ID: 1,
            Updated_User_ID: 1,
        }
        await dispatch(createUser(data));
        navigate('/userlist');
    }
    const handleCloseDialog =()=>{
        setUserErr('');
    }
    return (
        <div className={classes["create-user-area-component"]}>
            {isLoading && <Loading />}
            {userError && <CommonDialog message={userError} onClick={handleCloseDialog} />}
            <form className={classes["create-user-area-form"]}>
                <div className={classes["profile-photo-upload"]}>
                    <div
                        className={classes["image-section"]}
                        onClick={handleFileClick}
                        style={{
                            backgroundImage: selectedFile ? `url(${URL.createObjectURL(selectedFile)})` : `url(http://localhost:8080/assets/${userData.Profile_Photo})`
                        }}
                    >
                        {!selectedFile && !userData.Profile_Photo && <span>ပုံရွေးရန် click နှိပ်ပါ...</span>}
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
                    defaultValue={userData.Date_Of_Birth ? dateInput : ""}
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