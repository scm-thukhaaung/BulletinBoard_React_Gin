import classes from './PostCsvPage.module.css';
import { ChangeEvent, useRef, useState } from "react";
import { Box, Collapse, TextField, Zoom } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { parse } from "csv-parse/browser/esm/sync";
import { orange } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';

type cvsItem = {
    id: string;
    title: string;
    description: string;
    status: string;
    hasError: boolean;
};

const PostCsvPage = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [csvData, setCsvData] = useState<cvsItem[]>([]);
    const [filename, setFilename] = useState("");
    const [isEditMode, setEditMode] = useState(false)
    const [editIndex, setEditIndex] = useState(0)

    // Read csv and set csvData 
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        resetData();
        if (!e.target.files) {
            return;
        }
        let file = e.target.files[0];
        const { name } = file;
        if (!name.endsWith(".csv")) {
            console.error("Not a csv file.");
            return;
        }
        setFilename(name);

        const reader = new FileReader();
        reader.onload = (evt) => {
            if (!evt?.target?.result) {
                return;
            }
            const { result } = evt.target;
            const records = parse(result as string, {
                columns: ["title", "description", "status"],
                delimiter: ",",
                trim: true,
                skip_empty_lines: true
            });
            const dataRecords = records.slice(1)
            checkRowsDuplicate(dataRecords);
            checkEmptyColumn(dataRecords);
            checkStatusCol(dataRecords);
            setCsvData(dataRecords);
        };
        reader.readAsBinaryString(file);
        e.target.value = "";
    };

    const resetData = () => {
        setCsvData([]);
        setFilename("");
    }

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const handleBlur = () => {
        setEditMode(false);
        setEditIndex(0);
    }

    const handleDoubleClick = (index: number) => {
        setEditMode(true);
        setEditIndex(index);
    }

    const updateErrorFlg = (index: number) => {
        const isNotDuplicate = checkDupWithIndex(csvData, index);
        const isNotEmpty = checkEmptyWithIndex(csvData, index);
        const isNotStsCode = checkStatusWithIndex(csvData, index)

        if (isNotDuplicate && isNotEmpty && isNotStsCode) {
            csvData[index].hasError = false;
            setCsvData(csvData)
        } else {
            csvData[index].hasError = true;
        }
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
        csvData[i].title = event.target.value;
        updateErrorFlg(i);
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
        csvData[i].description = event.target.value;
        updateErrorFlg(i);
    }

    const handleStatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
        csvData[i].status = event.target.value;
        updateErrorFlg(i);
    }

    const handleSubmit = () => {
        console.log("submitted data-=-> ", csvData)
    }

    // Check all the rows duplicate
    const checkRowsDuplicate = (postList: any) => {
        for (let i = 0; i < postList.length; i++) {
            for (let j = i + 1; j < postList.length; j++) {
                if (postList[i].title === postList[j].title) {
                    postList[i].hasError = true;
                    return false;
                }
            }
        }
        return true;
    }

    // Check with index duplicate
    const checkDupWithIndex = (postList: any, index: number) => {
        for (let i = 0; i < postList.length; i++) {
            if (i !== index && postList[i].title === postList[index].title) {
                return false
            }
        }
        return true;
    }

    // Check empty column
    const checkEmptyColumn = (postList: any) => {
        let isEmpty = true;
        postList.forEach((eachPost: any) => {
            if (!eachPost.title || !eachPost.description || !eachPost.status) {
                eachPost.hasError = true;
                isEmpty = false;
            }
        })
        return isEmpty;
    }

    // Check empty column with index
    const checkEmptyWithIndex = (postList: any, index: number) => {
        if (postList[index].title && postList[index].description && postList[index].status) {
            return true;
        }
        return false;
    }

    // Check status colum
    const checkStatusCol = (postList: any) => {
        let isCorrect = true;
        postList.forEach((eachPost: any) => {
            if (eachPost.status !== "1" && eachPost.status !== "0") {
                isCorrect = false;
            }
        })
        return isCorrect;
    }

    // Check status code with index
    const checkStatusWithIndex = (postList: any, index: number) => {
        if (postList[index].status !== "1" && postList[index].status !== "0") {
            postList[index].hasError = true;
            return false;
        }
        return true;
    }

    // Post list component
    const postListCom = (
        csvData.map((eachPost, i) => {
            return (
                <li id={i + eachPost.title} className={!eachPost.hasError ?
                    classes["li-con"] :
                    [classes["li-con"], classes["err-data"]].join(' ')}>
                    <span className={classes["id-span"]}>{i + 1}</span>

                    {
                        <>
                            {
                                !isEditMode ? (
                                    <>
                                        <span onDoubleClick={() => handleDoubleClick(i)}>{eachPost.title}</span>
                                        <span onDoubleClick={() => handleDoubleClick(i)}>{eachPost.description}</span>
                                        <span onDoubleClick={() => handleDoubleClick(i)}>{eachPost.status}</span>
                                    </>
                                ) : (
                                    <>
                                        {editIndex === i ? (
                                            <>
                                                <span className={classes["title-width"]}>
                                                    <TextField id="standard-basic"
                                                        variant="standard"
                                                        defaultValue={eachPost.title}
                                                        onChange={(event) => handleTitleChange(event, i)}
                                                        onBlur={handleBlur}
                                                    />
                                                </span>
                                                <span className={classes["title-width"]}>
                                                    <TextField id="standard-basic"
                                                        style={{ width: '100%' }}
                                                        variant="standard"
                                                        defaultValue={eachPost.description}
                                                        onChange={(event) => handleDescriptionChange(event, i)}
                                                        onBlur={handleBlur}
                                                    />
                                                </span>
                                                <span className={classes["title-width"]}>
                                                    <TextField id="standard-basic"
                                                        variant="standard"
                                                        defaultValue={eachPost.status}
                                                        onChange={(event) => handleStatusChange(event, i)}
                                                        onBlur={handleBlur}
                                                    />
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span onDoubleClick={() => handleDoubleClick(i)}>{eachPost.title}</span>
                                                <span onDoubleClick={() => handleDoubleClick(i)}>{eachPost.description}</span>
                                                <span onDoubleClick={() => handleDoubleClick(i)}>{eachPost.status}</span>
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

    const postCom = (
        <>
            < div className={classes["error-msg"]}>
                <p> * Double click on the data to edit. </p>
            </div>
            <ul className={classes["list-con"]}>
                <li className={[classes["li-con"], classes["list-title"]].join(' ')} id="title">
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

    return (
        <div className={!csvData.length ? classes["wrapper-csv"] : ''}>
            {
                !csvData.length ?

                    // Csv upload bottom section
                    <Zoom in={csvData.length === 0}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(csvData.length !== 0 ? { timeout: 500 } : {})}>

                        <div
                            onClick={handleDivClick}
                            className={classes["upload-div"]}>

                            <UploadFileIcon className={classes["bounce-icon"]}
                                sx={{
                                    color: orange[400],
                                    stroke: "#ffffff",
                                    strokeWidth: 1,
                                    fontSize: "70px"
                                }} />
                            <span>Upload Csv File</span>

                            <input ref={fileInputRef} type="file" accept=".csv" hidden onChange={handleFileUpload} />

                        </div>
                    </Zoom>
                    :
                    // Csv post list showing section
                    <div>
                        <Zoom in={csvData.length !== 0}
                            className={classes["read-data-con"]}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(csvData.length !== 0 ? { timeout: 100 } : {})}>
                            <div>

                                <Zoom in={csvData.length !== 0}
                                    style={{ transformOrigin: '0 0 0' }}
                                    {...(csvData.length !== 0 ? { timeout: 1000 } : {})}>

                                    <div className={classes["table-top"]}>
                                        <span>{filename}</span>
                                        <span onClick={resetData}><ClearIcon className={classes["bounce-icon"]} /></span>
                                    </div>

                                </Zoom >

                                <Box sx={{ display: 'flex' }}>

                                    <Zoom in={csvData.length !== 0}
                                        style={{ transformOrigin: '0 0 0' }}
                                        {...(csvData.length !== 0 ? { timeout: 500 } : {})}>
                                        <Collapse in={csvData.length !== 0}>{postCom}</Collapse>
                                    </Zoom >

                                </Box>
                                <button className={classes["submit-btn"]} onClick={handleSubmit}>Submit</button>
                            </div>
                        </Zoom>
                    </div>
            }
        </div>
    );
}

export default PostCsvPage;