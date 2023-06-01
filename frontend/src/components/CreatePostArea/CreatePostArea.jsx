import { useState, createRef, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

import { Zoom, Fab } from '@mui/material';
import classes from "./CreatePostArea.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost, selectTempPost, postsAction, isNewPost, updatePost } from "../../store/Slices/postsSlice";
const CreatePostArea = (props) => {
    const dispatch = useDispatch();
    const tempPost = useSelector(selectTempPost);
    const isNewPostItem = useSelector(isNewPost);
    const [isExpanded, setExpanded] = useState(false);

    const handleTitleChange = (event) => {
        let value = event.target.value;
        dispatch(postsAction.setInputTempPost({
            title: value,
        }));
    };

    const handleDescriptionChange = (event) => {
        let value = event.target.value;
        dispatch(postsAction.setInputTempPost({
            description: value,
        }));
    };

    const submitPost = (event) => {
        if (!tempPost.Title || !tempPost.Description) return;

        if (isNewPostItem) {
            dispatch(createPost(tempPost)).unwrap();
        } else {
            dispatch(updatePost(tempPost)).unwrap();
        }

        event.preventDefault();
    };

    const expand = () => {
        setExpanded(true);
    };

    const closeExpand = () => {
        dispatch(postsAction.clearTempPost());
        setExpanded(false);
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

                <Zoom in={(tempPost.Title ? true : isExpanded)}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Fab onClick={submitPost}>
                            <AddIcon />
                        </Fab>
                        <Fab >
                            <EditIcon />
                        </Fab>
                        <Fab onClick={closeExpand}>
                            <CloseIcon />
                        </Fab>
                    </Box>
                </Zoom>
            </form>
        </div>
    );
};

export default CreatePostArea;