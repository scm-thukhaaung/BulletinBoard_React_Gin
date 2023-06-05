import classes from './PostCsvPage.module.css';
import { ChangeEvent, useRef, useState } from "react";
import { Box, Collapse, Zoom } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { parse } from "csv-parse/browser/esm/sync";
import { orange } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import CsvPostList from '../../components/csvPostList/CsvPostList';
import { useSelector, useDispatch } from "react-redux";
import { CsvPostItem } from '../../interfaces/PostInterface';
import { CheckPostUtilSvc } from '../../utils/utilSvc';
import { createCsvPost, csvPostAction, getCsvPosts } from '../../store/Slices/csvPostSlice';
import CommonDialog from '../../components/common/CommonDialog/CommonDialog';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../consts/Message';
import Loading from '../../components/Loading/Loading';

const PostCsvPage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [csvData, setCsvData] = useState<CsvPostItem[]>([]);
    const storedData = useSelector(getCsvPosts);
    const [filename, setFilename] = useState("");
    const dispatch: any = useDispatch();
    const [CsvError, setCsvError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await dispatch(createCsvPost(storedData));
            setLoading(false);
            if (!result.payload.data.length) {
                navigate('/');
            } else {
                setCsvError(Message.csvAlreadyTaken);
            }
        } catch (error) {
            setLoading(false);
            setCsvError(Message.csvError);
        }
    }

    // Read csv and set csvData 
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        resetData();
        if (!e.target.files) {
            setLoading(false);
            return;
        }
        let file = e.target.files[0];
        const { name } = file;
        if (!name.endsWith(".csv")) {
            setLoading(false);
            setCsvError(Message.notCsvFile);
            return;
        }
        setFilename(name);

        const reader = new FileReader();
        reader.onload = (evt) => {
            if (!evt?.target?.result) {
                setLoading(false);
                return;
            }
            const { result } = evt.target;
            const records = parse(result as string, {
                columns: ["Title", "Description", "Status"],
                delimiter: ",",
                trim: true,
                skip_empty_lines: true
            });
            const dataRecords = records.slice(1);
            const updatedList = CheckPostUtilSvc(dataRecords);
            dispatch(csvPostAction.addCsvList(updatedList));
            setCsvData(updatedList);
        };
        setLoading(false);
        reader.readAsBinaryString(file);
        e.target.value = "";
    };

    const resetData = () => {
        dispatch(csvPostAction.setInitialState());
        setCsvData([]);
        setFilename("");
    }

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    //Check disabled
    const checkDisabled = () => {
        const searchIndex = storedData.findIndex((eachPost: any) => eachPost.HasError)
        if (searchIndex === -1) {
            // Not found the error
            return false;
        }
        // Found the error
        return true;
    }

    const handleCloseDialog = () => {
        setCsvError('');
    }

    return (
        <div className={!csvData.length ? classes["wrapper-csv"] : ''}>
            {isLoading && <Loading />}
            {CsvError && <CommonDialog message={CsvError} onClick={handleCloseDialog} />}
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