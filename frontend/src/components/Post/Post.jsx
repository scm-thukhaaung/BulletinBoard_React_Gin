import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import classes from "./Post.module.css";
import { deletePost, postsAction } from "../../store/Slices/postsSlice";

const Post = props => {
    const h2Ref = useRef(null);
    const pRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const h2Width = h2Ref.current.offsetWidth;
        pRef.current.style.width = `${h2Width}px`;
    }, []);

    const handleDelete = () => {
        try {
            const id = props.postItem.ID;
            dispatch(deletePost({ id })).unwrap();
        } catch (error) {
            console.error(`Failed to delete the post ${error}`);
        }
    };

    const handleExportData = () => {
        if (props.postItem === "") return;
        dispatch(postsAction.setTempPost(props.postItem));
    };

    return (
        <div className={classes["post"]}>
            <h2 ref={h2Ref}>" {props.postItem.Title} "</h2>
            <p ref={pRef}>{props.postItem.Description}</p>

            {/* <p className={classes["post-created-by"]} >created by သုခ</p> */}
            <button className={classes["post-delete-btn"]} onClick={handleDelete}>
                <DeleteIcon />
            </button>
            <button className={classes["post-update-btn"]} onClick={handleExportData}>
                <EditIcon />
            </button>
        </div>
    );
};

export default Post;