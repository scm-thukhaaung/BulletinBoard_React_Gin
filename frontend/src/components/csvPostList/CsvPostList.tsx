import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import classes from './CsvPostList.module.css';
import { TextField } from "@mui/material";
import { updatePost } from "../../reducers/csvPostSlice";
import { CsvPostItem } from "../../interfaces/PostInterface";

// type cvsItem = {
//     id: number;
//     Title: string;
//     Description: string;
//     Status: string;
//     HasError: boolean;
// };
export const CsvPostList = () => {
    let storedData = useSelector((state: any) => state.csvPost.csvPosts);
    const [csvData] = useState<CsvPostItem[]>([...storedData]);
    const dispatch = useDispatch();
    const [isEditMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(0);
    const [tmpTitle, setTmpTitle] = useState("");
    const [tmpDesc, setTmpDesc] = useState("");
    const [tmpStatus, setTmpStatus] = useState("");
    const [tmpHasErr, setHasErr] = useState(false);


    // Update the store data
    const handleBlur = (index: number) => {
        setEditMode(false);
        setEditIndex(-1);
        updateErrorFlg(index)
        updateData(index);
    }

    const updateData = (index: number) => {
        const data = {
            ID: index,
            Title: tmpTitle,
            Description: tmpDesc,
            Status: tmpStatus,
            HasErr: tmpHasErr
        }
        dispatch(updatePost(data));
        csvData[index] = {
            ...csvData[index],
            Title: tmpTitle ? tmpTitle : csvData[index].Title,
            Description: tmpDesc ? tmpDesc : csvData[index].Description,
            Status: tmpStatus ? tmpStatus : csvData[index].Status,
            HasError: tmpHasErr
        };
    }

    const handleDoubleClick = (index: number) => {
        setEditMode(true);
        setEditIndex(index);
        setTmpTitle("");
        setTmpDesc("");
        setTmpStatus("");
        // setHasErr(false);
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setTmpTitle(event.target.value);
        const searchIndex = csvData.findIndex((post: any, i: number) => i !== index && post.Title === event.target.value);
        console.log("searchIndex", searchIndex)
        // if (searchIndex !== -1) {
        //     setHasErr(true);
        // } else {
        //     setHasErr(false);
        // }
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setTmpDesc(event.target.value) 
        // if (tmpHasErr !== true && event.target.value === "") {
        //     setHasErr(true);
        // } else {
        //     setHasErr(false);
        // }
    }

    const handleStatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
        setTmpStatus(event.target.value);
        console.log(tmpHasErr !== true , event.target.value === "" , event.target.value !== "0", event.target.value !== "1")
        // if (tmpHasErr !== true && event.target.value === ""){
        //     setHasErr(true);
        // } else if (event.target.value !== "1" && event.target.value !== "0") {
        //     setHasErr(true);
        // } else {
        //     setHasErr(false);
        // }
    }

    // Check all the rows duplicate
    const checkRowsDuplicate = (postList: any) => {
        for (let i = 0; i < postList.length; i++) {
            for (let j = i + 1; j < postList.length; j++) {
                if (postList[i].Title === postList[j].Title) {
                    return false;
                }
            }
        }
        return true;
    }

    // Check empty column
    const checkEmptyColumn = (postList: any) => {
        postList.forEach((eachPost: any) => {
            if (!eachPost.Title || !eachPost.Description || !eachPost.Status) {
                return false;
            }
        })
        return true;
    }

    // Check Status colum
    const checkStatusCol = (postList: any) => {
        postList.forEach((eachPost: any) => {
            if (eachPost.Status !== "1" && eachPost.Status !== "0") {
                return false;
            }
        })
        return true;
    }

    // Check with index duplicate
    const checkDupWithIndex = (index: number) => {
        for (let i = 0; i < csvData.length; i++) {
            if (i !== index && csvData[i].Title === csvData[index].Title) {
                
                csvData[index] = { ...csvData[index], HasError: true };
                return false
            }
        }
        return true;
    }

    // Check empty column with index
    const checkEmptyWithIndex = (index: number) => {
        if (csvData[index].Title && csvData[index].Description && csvData[index].Status) {
            return true;
        }
        csvData[index] = { ...csvData[index], HasError: true };
        return false;
    }

    // Check Status code with index
    const checkStatusWithIndex = (index: number) => {
        if (csvData[index].Status !== "1" && csvData[index].Status !== "0") {
            csvData[index] = { ...csvData[index], HasError: true };
            return false;
        }
        return true;
    }

    // Update error flg every onBlur event
    const updateErrorFlg = (index: number) => {
        // Check individual row
        const isNotDuplicate = checkDupWithIndex(index);
        const isNotEmpty = checkEmptyWithIndex(index);
        const isNotStsCode = checkStatusWithIndex(index);

        let isEditRowOk = false;
        console.log(isNotDuplicate, isNotEmpty, isNotStsCode)
        if (isNotDuplicate && isNotEmpty && isNotStsCode) {
            isEditRowOk = true;
        }

        let isAllRowsOk = true;
        if (isEditRowOk) {
            // Check with all other rows
            const isNotDuplicate = checkRowsDuplicate(csvData);
            const isNotEmpty = checkEmptyColumn(csvData);
            const isNotStsCode = checkStatusCol(csvData);
            console.log("==-=> ", isNotDuplicate, isNotEmpty, isNotStsCode)

            if (!isNotDuplicate || !isNotEmpty || !isNotStsCode) {
                isAllRowsOk = false;
            }
        }

        console.log('isEditRowOk && isAllRowsOk==> ', isEditRowOk, isAllRowsOk)
        if (isEditRowOk && isAllRowsOk) {
            setHasErr(false);
            console.log("tmpErr 1-=-> ", tmpHasErr)
        } else {
            setHasErr(true);
            console.log("tmpErr 2-=-> ", tmpHasErr)
        }
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
                <p> * Double click on the data to edit. </p>
            </div>
            <ul className={classes["list-con"]} id="post-list">
                <li className={[classes["li-con"], classes["list-Title"]].join(' ')} id="Title">
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

// import { useSelector, useDispatch } from "react-redux";
// import { ChangeEvent, useState, useEffect } from "react";
// import classes from './CsvPostList.module.css';
// import { TextField } from "@mui/material";
// import { updatePost } from "../../reducers/csvPostSlice";

// type CsvItem = {
//   id: number;
//   Title: string;
//   Description: string;
//   Status: string;
//   HasError: boolean;
// };

// export const CsvPostList = () => {
//   const storedData = useSelector((state: any) => state.csvPost.csvPosts);
//   const [csvData, setCsvData] = useState<CsvItem[]>([...storedData]);
//   const dispatch = useDispatch();
//   const [isEditMode, setEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(-1);

//   const handleDoubleClick = (index: number) => {
//     setEditIndex(index);
//   }

//   const handleBlur = (index: number) => {
//     setEditMode(false);
//     setEditIndex(-1);
//     updateErrorFlg(index);
//     updateData(index);
//   }

//   const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
//     setCsvData(prevData => {
//       const newData = [...prevData];
//       newData[index].Title = event.target.value;
//       return newData;
//     });
//   };

//   const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
//     setCsvData(prevData => {
//       const newData = [...prevData];
//       newData[index].Description = event.target.value;
//       return newData;
//     });
//   }

//   const handleStatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
//     setCsvData(prevData => {
//       const newData = [...prevData];
//       newData[index].Status = event.target.value;
//       return newData;
//     });
//   }

//   const updateData = (index: number) => {
//     const updatedPost = csvData[index];
//     dispatch(updatePost(updatedPost));
//   }

//   const updateErrorFlg = (index: number) => {
//     const rowData = csvData[index];

//     const isDuplicate = csvData.some((post, i) => i !== index && post.Title === rowData.Title);
//     const isNotEmpty = rowData.Title && rowData.Description && rowData.Status;
//     const isValidStatus = rowData.Status === "1" || rowData.Status === "0";

//     setCsvData(prevData => {
//       const newData = [...prevData];
//       newData[index].HasError = !(isDuplicate && isNotEmpty && isValidStatus);
//       return newData;
//     });
//   }

//   const RowComponent = (props: { data: CsvItem, index: number }) => {
//     const { data, index } = props;

//     return (
//       <>
//         <span onDoubleClick={() => handleDoubleClick(index)}>{data.Title}</span>
//         <span onDoubleClick={() => handleDoubleClick(index)}>{data.Description}</span>
//         <span onDoubleClick={() => handleDoubleClick(index)}>{data.Status}</span>
//       </>
//     );
//   }

//   const postListCom = csvData.map((postData, index) => (
//     <li key={postData.id} className={`${classes["li-con"]} ${postData.HasError && classes["err-data"]}`}>
//       <span className={classes["id-span"]}>{index + 1}</span>

//       {!isEditMode || editIndex !== index ? (
//         <RowComponent data={postData} index={index} />
//       ) : (
//         <>
//           <span className={classes["Title-width"]}>
//             <TextField
//               id="standard-basic"
//               variant="standard"
//               defaultValue={postData.Title}
//               onChange={(event) => handleTitleChange(event, index)}
//               onBlur={() => handleBlur(index)}
//             />
//           </span>
//           <span className={classes["Title-width"]}>
//             <TextField
//               id="standard-basic"
//               style={{ width: '100%' }}
//               variant="standard"
//               defaultValue={postData.Description}
//               onChange={(event) => handleDescriptionChange(event, index)}
//               onBlur={() => handleBlur(index)}
//             />
//           </span>
//           <span className={classes["Title-width"]}>
//             <TextField
//               id="standard-basic"
//               variant="standard"
//               defaultValue={postData.Status}
//               onChange={(event) => handleStatusChange(event, index)}
//               onBlur={() => handleBlur(index)}
//             />
//           </span>
//         </>
//       )}
//     </li>
//   ));

//   return (
//     <>
//       <div className={classes["error-msg"]} id="error-msg">
//         <p>* Double click on the data to edit.</p>
//       </div>
//       <ul className={classes["list-con"]} id="post-list">
//         <li className={`${classes["li-con"]} ${classes["list-Title"]}`} id="Title">
//           <span className={classes["id-span"]}>ID</span>
//           <span>Title</span>
//           <span>Description</span>
//           <span>Status</span>
//         </li>
//         {postListCom}
//       </ul>
//     </>
//   );
// }

// export default CsvPostList;
