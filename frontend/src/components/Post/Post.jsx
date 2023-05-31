import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useRef, useEffect } from "react";
import classes from "./Post.module.css";

const Post = props => {

    const h2Ref = useRef(null);
    const pRef = useRef(null);

    useEffect(() => {
        const h2Width = h2Ref.current.offsetWidth;
        pRef.current.style.width = `${h2Width}px`;
    }, []);

    const handleClick = (props) => {
        props.onDelete(props.id);
    };

    return (
        <div className={classes["post"]}>
            <h2 ref={h2Ref}>" {props.title} "</h2>
            <p ref={pRef}>{props.description}</p>

            <p className={classes["post-created-by"]} >created by သုခ</p>
            <button className={classes["post-delete-btn"]} onClick={handleClick}>
                <DeleteIcon />
            </button>
            <button className={classes["post-update-btn"]} onClick={handleClick}>
                <EditIcon />
            </button>
        </div>
    );
};

export default Post;