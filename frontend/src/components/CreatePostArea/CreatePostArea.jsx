import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

import { Zoom, Fab } from '@mui/material';
import classes from "./CreatePostArea.module.css";

const CreatePostArea = (props) => {
    const [isExpanded, setExpanded] = useState(false);

    const [post, setPost] = useState({
        title: "",
        description: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost(prevPost => {
            return {
                ...prevPost,
                [name]: value
            };
        });
    };

    const submitPost = (event) => {
        if(post.title === "" && post.description === "") return
        props.onAdd(post);
        setPost({
            title: "",
            description: ""
        });

        event.preventDefault();
    };

    const expand = () => {
        setExpanded(true);
    };

    const closeExpand = () => {
        setExpanded(false);
    }

    return (
        <div className={classes["create-post-component"]}>
            <form className={classes["create-post"]}>
                {isExpanded && (
                    <input
                        name="title"
                        onChange={handleChange}
                        value={post.title}
                        placeholder="ခေါင်းစဉ်"
                    />
                )}

                <textarea
                    name="description"
                    onClick={expand}
                    onChange={handleChange}
                    value={post.description}
                    placeholder="ရင်ဖွင့်လိုက်ပါ..."
                    rows={isExpanded ? 3 : 1}
                />

                <Zoom in={isExpanded}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end' }}>
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