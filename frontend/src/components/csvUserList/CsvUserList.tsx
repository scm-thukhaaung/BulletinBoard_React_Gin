import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import classes from './CsvUserList.module.css';
import { TextField } from "@mui/material";
import { CheckUserUtilSvc } from "../../utils/utilSvc";
import { checkUserExist, csvUserAction, getcsvUsers } from "../../store/Slices/csvUserSlice";
import { CsvUserItem, UserInterface } from "../../interfaces/UserInterface";
import { Constant } from "../../consts/Constant";

const CsvUserList = () => {
    let storedData = useSelector(getcsvUsers);
    const isUserExist = useSelector(checkUserExist);
    const csvData = [...storedData];
    const dispatch = useDispatch();
    const [isEditMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(0);
    const [tmpName, setTmpName] = useState("");
    const [tmpEmail, setTmpEmail] = useState("");
    const [tmpType, setTmpType] = useState("");

    // Update the store data
    const handleBlur = (index: number) => {
        setEditMode(false);
        setEditIndex(-1);
        csvData[index] = { ...csvData[index], Name: tmpName ? tmpName : csvData[index].Name }
        csvData[index] = { ...csvData[index], Email: tmpEmail ? tmpEmail : csvData[index].Email }
        csvData[index] = { ...csvData[index], Type: tmpType ? tmpType : csvData[index].Type }
        checkError(index);
        updateData(index, csvData[index]);
    }

    // Check error and update HasError value
    const checkError = (index: number) => {
        let isDup = false;
        for (let i = 0; i < csvData.length; i++) {
            if (i !== index && csvData[i].Name === csvData[index].Name) {
                isDup = true;
            }
            if (i !== index && csvData[i].Email === csvData[index].Email) {
                isDup = true;
            }
            if (!Constant.emailRegExp.test(csvData[i].Email)) {
                isDup = true;
            }
        }

        let isTypeWrong = false;
        if (csvData[index].Type !== "0" &&
            csvData[index].Type !== "1") {
            isTypeWrong = true;
        }

        if (isDup || isTypeWrong) {
            csvData[index] = { ...csvData[index], HasError: true };
        } else {
            csvData[index] = { ...csvData[index], HasError: false };
        }

        const updatedList = CheckUserUtilSvc(csvData);
        dispatch(csvUserAction.addCsvList(updatedList));
    }

    const updateData = (index: number, dataToUpdate: CsvUserItem) => {
        const data = {
            ID: index,
            Name: dataToUpdate.Name,
            Email: dataToUpdate.Email,
            Type: dataToUpdate.Type,
            HasError: dataToUpdate.HasError
        }
        dispatch(csvUserAction.updateUser(data));
    }

    const handleDoubleClick = (index: number) => {
        setEditMode(true);
        setEditIndex(index);
        setTmpName("");
        setTmpEmail("");
        setTmpType("");
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setTmpName(event.target.value);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setTmpEmail(event.target.value)
    }

    const handleTypeChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
        setTmpType(event.target.value);
    }

    const RowComponent = (props: any) => {
        return (
            <>
                <span onDoubleClick={() => handleDoubleClick(props.data.ID)}>{props.data.userData.Name}</span>
                <span onDoubleClick={() => handleDoubleClick(props.data.ID)}>{props.data.userData.Email}</span>
                <span onDoubleClick={() => handleDoubleClick(props.data.ID)}>{props.data.userData.Type}</span>
            </>
        )
    }

    const userListCom = (
        csvData.map((eachUser: UserInterface, i: number) => {
            return (
                <li key={eachUser.Name! + i} className={!eachUser.HasError ?
                    classes["li-con"] :
                    [classes["li-con"], classes["err-data"]].join(' ')}>
                    <span className={classes["id-span"]}>{i + 1}</span>

                    {
                        <>
                            {
                                !isEditMode ? (
                                    <>
                                        <RowComponent data={{ userData: eachUser, id: i }} />
                                    </>
                                ) : (
                                    <>
                                        {editIndex === i ? (
                                            <>
                                                <span className={classes["Title-width"]}>
                                                    <TextField id="standard-basic"
                                                        variant="standard"
                                                        defaultValue={eachUser.Name}
                                                        onChange={(event) => handleNameChange(event, i)}
                                                        onBlur={() => handleBlur(i)}
                                                    />
                                                </span>
                                                <span className={classes["Title-width"]}>
                                                    <TextField id="standard-basic"
                                                        style={{ width: '100%' }}
                                                        variant="standard"
                                                        defaultValue={eachUser.Email}
                                                        onChange={(event) => handleEmailChange(event, i)}
                                                        onBlur={() => handleBlur(i)}
                                                    />
                                                </span>
                                                <span className={classes["Title-width"]}>
                                                    <TextField id="standard-basic"
                                                        variant="standard"
                                                        defaultValue={eachUser.Type}
                                                        onChange={(event) => handleTypeChange(event, i)}
                                                        onBlur={() => handleBlur(i)}
                                                    />
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <RowComponent data={{ userData: eachUser, ID: i }} />
                                            </>
                                        )}
                                    </>
                                )
                            }
                        </>
                    }
                </li>
            )
        })
    )

    return (
        <>
            < div className={classes["error-msg"]} id="error-msg">
                {
                    !isUserExist ?
                        <p> * Double click on the data to edit. </p>
                        :
                        <p> * The name or email of these users are already taken. </p>
                }
            </div>
            <ul className={classes["list-con"]} id="user-list">
                <li className={[classes["li-con"], classes["list-name"]].join(' ')} id="Title">
                    <span className={classes["id-span"]}>ID</span>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Type</span>
                </li>
                {
                    userListCom
                }
            </ul >
        </>
    )
}

export default CsvUserList;
