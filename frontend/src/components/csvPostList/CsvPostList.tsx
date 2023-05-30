import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import classes from './CsvPostList.module.css';
import { TextField } from "@mui/material";
import { updatePost } from "../../reducers/csvPostSlice";

type cvsItem = {
    id: number;
    title: string;
    description: string;
    status: string;
    hasError: boolean;
};
export const CsvPostList = () => {
    let storedData = useSelector((state: any) => state.csvPost.csvPosts);
    const [csvData] = useState<cvsItem[]>([...storedData]);
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
            id: index,
            title: tmpTitle,
            description: tmpDesc,
            status: tmpStatus,
            hasErr: tmpHasErr
        }
        dispatch(updatePost(data));
        csvData[index] = {
            ...csvData[index],
            title: tmpTitle ? tmpTitle : csvData[index].title,
            description: tmpDesc ? tmpDesc : csvData[index].description,
            status: tmpStatus ? tmpStatus : csvData[index].status,
            hasError: tmpHasErr
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
        const searchIndex = csvData.findIndex((post: any, i: number) => i !== index && post.title === event.target.value);
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
                if (postList[i].title === postList[j].title) {
                    return false;
                }
            }
        }
        return true;
    }

    // Check empty column
    const checkEmptyColumn = (postList: any) => {
        postList.forEach((eachPost: any) => {
            if (!eachPost.title || !eachPost.description || !eachPost.status) {
                return false;
            }
        })
        return true;
    }

    // Check status colum
    const checkStatusCol = (postList: any) => {
        postList.forEach((eachPost: any) => {
            if (eachPost.status !== "1" && eachPost.status !== "0") {
                return false;
            }
        })
        return true;
    }

    // Check with index duplicate
    const checkDupWithIndex = (index: number) => {
        for (let i = 0; i < csvData.length; i++) {
            if (i !== index && csvData[i].title === csvData[index].title) {
                
                csvData[index] = { ...csvData[index], hasError: true };
                return false
            }
        }
        return true;
    }

    // Check empty column with index
    const checkEmptyWithIndex = (index: number) => {
        if (csvData[index].title && csvData[index].description && csvData[index].status) {
            return true;
        }
        csvData[index] = { ...csvData[index], hasError: true };
        return false;
    }

    // Check status code with index
    const checkStatusWithIndex = (index: number) => {
        if (csvData[index].status !== "1" && csvData[index].status !== "0") {
            csvData[index] = { ...csvData[index], hasError: true };
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
                <span onDoubleClick={() => handleDoubleClick(props.data.id)}>{props.data.postData.title}</span>
                <span onDoubleClick={() => handleDoubleClick(props.data.id)}>{props.data.postData.description}</span>
                <span onDoubleClick={() => handleDoubleClick(props.data.id)}>{props.data.postData.status}</span>
            </>
        )
    }


    const postListCom = (
        csvData.map((eachPost: any, i: number) => {
            return (
                <li key={eachPost.title + i} className={!eachPost.hasError ?
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
                                                <span className={classes["title-width"]}>
                                                    <TextField id="standard-basic"
                                                        variant="standard"
                                                        defaultValue={eachPost.title}
                                                        onChange={(event) => handleTitleChange(event, i)}
                                                        onBlur={() => handleBlur(i)}
                                                    />
                                                </span>
                                                <span className={classes["title-width"]}>
                                                    <TextField id="standard-basic"
                                                        style={{ width: '100%' }}
                                                        variant="standard"
                                                        defaultValue={eachPost.description}
                                                        onChange={(event) => handleDescriptionChange(event, i)}
                                                        onBlur={() => handleBlur(i)}
                                                    />
                                                </span>
                                                <span className={classes["title-width"]}>
                                                    <TextField id="standard-basic"
                                                        variant="standard"
                                                        defaultValue={eachPost.status}
                                                        onChange={(event) => handleStatusChange(event, i)}
                                                        onBlur={() => handleBlur(i)}
                                                    />
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <RowComponent data={{ postData: eachPost, id: i }} />
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
}

export default CsvPostList;

// import { useSelector, useDispatch } from "react-redux";
// import { ChangeEvent, useState, useEffect } from "react";
// import classes from './CsvPostList.module.css';
// import { TextField } from "@mui/material";
// import { updatePost } from "../../reducers/csvPostSlice";

// type CsvItem = {
//   id: number;
//   title: string;
//   description: string;
//   status: string;
//   hasError: boolean;
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
//       newData[index].title = event.target.value;
//       return newData;
//     });
//   };

//   const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
//     setCsvData(prevData => {
//       const newData = [...prevData];
//       newData[index].description = event.target.value;
//       return newData;
//     });
//   }

//   const handleStatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
//     setCsvData(prevData => {
//       const newData = [...prevData];
//       newData[index].status = event.target.value;
//       return newData;
//     });
//   }

//   const updateData = (index: number) => {
//     const updatedPost = csvData[index];
//     dispatch(updatePost(updatedPost));
//   }

//   const updateErrorFlg = (index: number) => {
//     const rowData = csvData[index];

//     const isDuplicate = csvData.some((post, i) => i !== index && post.title === rowData.title);
//     const isNotEmpty = rowData.title && rowData.description && rowData.status;
//     const isValidStatus = rowData.status === "1" || rowData.status === "0";

//     setCsvData(prevData => {
//       const newData = [...prevData];
//       newData[index].hasError = !(isDuplicate && isNotEmpty && isValidStatus);
//       return newData;
//     });
//   }

//   const RowComponent = (props: { data: CsvItem, index: number }) => {
//     const { data, index } = props;

//     return (
//       <>
//         <span onDoubleClick={() => handleDoubleClick(index)}>{data.title}</span>
//         <span onDoubleClick={() => handleDoubleClick(index)}>{data.description}</span>
//         <span onDoubleClick={() => handleDoubleClick(index)}>{data.status}</span>
//       </>
//     );
//   }

//   const postListCom = csvData.map((postData, index) => (
//     <li key={postData.id} className={`${classes["li-con"]} ${postData.hasError && classes["err-data"]}`}>
//       <span className={classes["id-span"]}>{index + 1}</span>

//       {!isEditMode || editIndex !== index ? (
//         <RowComponent data={postData} index={index} />
//       ) : (
//         <>
//           <span className={classes["title-width"]}>
//             <TextField
//               id="standard-basic"
//               variant="standard"
//               defaultValue={postData.title}
//               onChange={(event) => handleTitleChange(event, index)}
//               onBlur={() => handleBlur(index)}
//             />
//           </span>
//           <span className={classes["title-width"]}>
//             <TextField
//               id="standard-basic"
//               style={{ width: '100%' }}
//               variant="standard"
//               defaultValue={postData.description}
//               onChange={(event) => handleDescriptionChange(event, index)}
//               onBlur={() => handleBlur(index)}
//             />
//           </span>
//           <span className={classes["title-width"]}>
//             <TextField
//               id="standard-basic"
//               variant="standard"
//               defaultValue={postData.status}
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
//         <li className={`${classes["li-con"]} ${classes["list-title"]}`} id="title">
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
