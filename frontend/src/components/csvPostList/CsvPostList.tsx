import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import classes from './CsvPostList.module.css';
import { TextField } from "@mui/material";
import { CsvPostItem } from "../../interfaces/PostInterface";
import { CheckPostUtilSvc } from "../../utils/utilSvc";
import { checkPostExist, csvPostAction, getCsvPosts } from "../../store/Slices/csvPostSlice";

const CsvPostList = () => {
    let storedData = useSelector(getCsvPosts);
    const isPostExist = useSelector(checkPostExist);
    const csvData = [...storedData];
    const dispatch = useDispatch();
    const [isEditMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(0);
    const [tmpTitle, setTmpTitle] = useState("");
    const [tmpDesc, setTmpDesc] = useState("");
    const [tmpStatus, setTmpStatus] = useState("");

    // Update the store data
    const handleBlur = (index: number) => {
        setEditMode(false);
        setEditIndex(-1);
        csvData[index] = { ...csvData[index], Title: tmpTitle ? tmpTitle : csvData[index].Title }
        csvData[index] = { ...csvData[index], Description: tmpDesc ? tmpDesc : csvData[index].Description }
        csvData[index] = { ...csvData[index], Status: tmpStatus ? tmpStatus : csvData[index].Status }
        checkError(index);
        updateData(index, csvData[index]);
    }

    // Check error and update HasError value
    const checkError = (index: number) => {
        let isDup = false;
        for (let i = 0; i < csvData.length; i++) {
            if (i !== index && csvData[i].Title === csvData[index].Title) {
                isDup = true;
            }
        }
        
        let isStsWrong = false;
        if (csvData[index].Status !== "0" &&
            csvData[index].Status !== "1") {
            isStsWrong = true;
        }

        if (isDup || isStsWrong) {
            csvData[index] = { ...csvData[index], HasError: true };
        } else {
            csvData[index] = { ...csvData[index], HasError: false };
        }

        const updatedList = CheckPostUtilSvc(csvData);
        dispatch(csvPostAction.addCsvList(updatedList));
    }

    const updateData = (index: number, dataToUpdate: CsvPostItem) => {
        const data = {
            ID: index,
            Title: dataToUpdate.Title,
            Description: dataToUpdate.Description,
            Status: dataToUpdate.Status,
            HasError: dataToUpdate.HasError
        }
        dispatch(csvPostAction.updatePost(data));
    }

    const handleDoubleClick = (index: number) => {
        setEditMode(true);
        setEditIndex(index);
        setTmpTitle("");
        setTmpDesc("");
        setTmpStatus("");
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setTmpTitle(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setTmpDesc(event.target.value)
    }

    const handleStatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
        setTmpStatus(event.target.value);
    }

    const RowComponent = (props: any) => {
        return (
            <>
                <span onDoubleClick={() => handleDoubleClick(props.data.ID)}>{props.data.postData.Title}</span>
                <span onDoubleClick={() => handleDoubleClick(props.data.ID)}>{props.data.postData.Description}</span>
                <span onDoubleClick={() => handleDoubleClick(props.data.ID)}>{props.data.postData.Status}</span>
            </>
        )
    }

    const postListCom = (
        csvData.map((eachPost: any, i: number) => {
            return (
                <li key={eachPost.Title + i} className={!eachPost.HasError ?
                    classes["li-con"] :
                    [classes["li-con"], classes["err-data"]].join(' ')}>
                    <span className={classes["id-span"]}>{i + 1}</span>

                    {
                        <>
                            {
                                !isEditMode ? (
                                    <>
                                        <RowComponent data={{ postData: eachPost, id: i }} />
                                    </>
                                ) : (
                                    <>
                                        {editIndex === i ? (
                                            <>
                                                <span className={classes["Title-width"]}>
                                                    <TextField id="standard-basic"
                                                        variant="standard"
                                                        defaultValue={eachPost.Title}
                                                        onChange={(event) => handleTitleChange(event, i)}
                                                        onBlur={() => handleBlur(i)}
                                                    />
                                                </span>
                                                <span className={classes["Title-width"]}>
                                                    <TextField id="standard-basic"
                                                        style={{ width: '100%' }}
                                                        variant="standard"
                                                        defaultValue={eachPost.Description}
                                                        onChange={(event) => handleDescriptionChange(event, i)}
                                                        onBlur={() => handleBlur(i)}
                                                    />
                                                </span>
                                                <span className={classes["Title-width"]}>
                                                    <TextField id="standard-basic"
                                                        variant="standard"
                                                        defaultValue={eachPost.Status}
                                                        onChange={(event) => handleStatusChange(event, i)}
                                                        onBlur={() => handleBlur(i)}
                                                    />
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <RowComponent data={{ postData: eachPost, ID: i }} />
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
                    !isPostExist ?
                        <p> * Double click on the data to edit. </p>
                        :
                        <p> * The title of these posts are already taken. </p>
                }
            </div>
            <ul className={classes["list-con"]} id="post-list">
                <li className={[classes["li-con"], classes["list-title"]].join(' ')} id="Title">
                    <span className={classes["id-span"]}>ID</span>
                    <span>Title</span>
                    <span>Description</span>
                    <span>Status</span>
                </li>
                {
                    postListCom
                }
            </ul >
        </>
    )
}

export default CsvPostList;
