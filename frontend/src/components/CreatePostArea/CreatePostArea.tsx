import { useState } from "react";
import { FormControlLabel, Typography, Zoom, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from "react-redux";

import classes from "./CreatePostArea.module.css";

import { createPost, selectTempPost, postsAction, isNewPost, updatePost } from "../../store/Slices/postsSlice";
import { GoldenSwitch } from '../common/custom_mui/CustomMUI';

const CreatePostArea = () => {
    const dispatch: any = useDispatch();

    const [isExpanded, setExpanded] = useState(false);

    const isNewPostItem = useSelector(isNewPost);
    const tempPost = useSelector(selectTempPost);

    /**
     * Close Expand Action 
     * @summary dispatch(postsAction.clearTempPost()) , setExpanded(false)
     */
    const closeExpand = () => {
        dispatch(postsAction.clearTempPost());
        setExpanded(false);
    };

    const expand = () => {
        setExpanded(true);
    };

    const handleDescriptionChange = (event: any) => {
        let value = event.target.value;
        dispatch(postsAction.setInputTempPost({
            description: value,
        }));
    };

    const handleStatusChange = (event: any) => {
        let value = event.target.checked;
        const status = value ? "1" : "0";
        dispatch(postsAction.setInputTempPost({
            status: status,
        }));
    };

    const handleTitleChange = (event: any) => {
        let value = event.target.value;
        dispatch(postsAction.setInputTempPost({
            title: value,
        }));
    };

    const submitPost = (event: any) => {
        if (!tempPost.Title || !tempPost.Description) return;

        if (isNewPostItem) {
            dispatch(createPost(tempPost)).unwrap();
        } else {
            dispatch(updatePost(tempPost)).unwrap();
        }

        event.preventDefault();
    };

    return (
        <div className={classes["create-post-component"]}>

            <form className={classes["create-post"]}>
                {(tempPost.Title ? true : isExpanded) && (
                    <input
                        name="title"
                        onChange={handleTitleChange}
                        value={tempPost.Title}
                        placeholder="ခေါင်းစဉ်"
                    />
                )}

                <textarea
                    name="description"
                    onClick={expand}
                    onChange={handleDescriptionChange}
                    value={tempPost.Description}
                    placeholder="ရင်ဖွင့်လိုက်ပါ..."
                    rows={isExpanded ? 3 : 1}
                />
                {(tempPost.Title ? true : isExpanded) && (<FormControlLabel control={<GoldenSwitch onChange={handleStatusChange} checked={tempPost.Status === "1" ? true : false} />} label={<Typography sx={{ fontFamily: "UMoe", fontSize: "1.2em" }}>မျှဝေမည်...</Typography>} />)}

                {(tempPost.Title ? true : isExpanded) && (<Zoom in={(tempPost.Title ? true : isExpanded)}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <Fab onClick={submitPost}>
                            <AddIcon />
                        </Fab>

                        <Fab onClick={closeExpand}>
                            <CloseIcon />
                        </Fab>
                    </Box>
                </Zoom>
                )}
            </form>
        </div>
    );
};

export default CreatePostArea;