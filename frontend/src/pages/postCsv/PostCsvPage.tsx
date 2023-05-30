import classes from './PostCsvPage.module.css';
import { ChangeEvent, useRef, useState } from "react";
import { Box, Collapse, Zoom } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { parse } from "csv-parse/browser/esm/sync";
import { orange } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import CsvPostList from '../../components/csvPostList/CsvPostList';
import { useSelector, useDispatch } from "react-redux";
import { addCsvList } from '../../reducers/csvPostSlice';
import CsvPostSvc from '../../services/CsvPostSvc';
import { CsvPostItem } from '../../interfaces/PostInterface';

const PostCsvPage = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [csvData, setCsvData] = useState<CsvPostItem[]>([]);
    const storedData = useSelector((state: any) => state.csvPost.csvPosts);
    const [filename, setFilename] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async() => {
        console.log("submitted data-=-> ", storedData)
            try{
                const result = await CsvPostSvc(storedData);
                console.log('result', result);
            } catch (error) {
                console.error('Error at postCsv page: ', error);
            }
    }

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
                columns: ["Title", "Description", "Status"],
                delimiter: ",",
                trim: true,
                skip_empty_lines: true
            });
            const dataRecords = records.slice(1)
            console.log('read data00-0> ', dataRecords)
            checkRowsDuplicate(dataRecords);
            checkEmptyColumn(dataRecords);
            checkStatusCol(dataRecords);
            dispatch(addCsvList(dataRecords));
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

    // Check all the rows duplicate
    const checkRowsDuplicate = (postList: any) => {
        for (let i = 0; i < postList.length; i++) {
            for (let j = i + 1; j < postList.length; j++) {
                if (postList[i].Title === postList[j].Title) {
                    postList[i].HasError = true;
                    return false;
                }
            }
        }
        return true;
    }

    // Check empty column
    const checkEmptyColumn = (postList: any) => {
        let isEmpty = true;
        postList.forEach((eachPost: any) => {
            if (!eachPost.Title || !eachPost.Description || !eachPost.Status) {
                eachPost.HasError = true;
                isEmpty = false;
            }
        })
        return isEmpty;
    }

    // Check Status colum
    const checkStatusCol = (postList: any) => {
        let isCorrect = true;
        postList.forEach((eachPost: any) => {
            if (eachPost.Status !== "1" && eachPost.Status !== "0") {
                eachPost.HasError = true;
                isCorrect = false;
            }
        })
        return isCorrect;
    }

    //Check disabled
    const checkDisabled = () => {
        console.log('stroed data-=> ', storedData)
        const searchIndex = storedData.findIndex((eachPost: any) => eachPost.HasError)
        if (searchIndex === -1) {
            // Not found the error
            return false;
        }
        // Found the error
        return true;
    }

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
                                        <Collapse in={csvData.length !== 0}><CsvPostList /></Collapse>
                                    </Zoom >

                                </Box>
                                <button className={classes["submit-btn"]} disabled={checkDisabled()} onClick={handleSubmit}>Submit</button>
                            </div>
                        </Zoom>
                    </div>
            }
        </div>
    );
}

export default PostCsvPage;