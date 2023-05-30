import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import classes from "./Post.module.css";

const Post = props => {

    const handleClick = (props) => {
        props.onDelete(props.id);
    };

    return (
        <div className={classes["post"]}>
            <h2>" {props.title} "</h2>
            <p>{props.description}</p>

            <p className={classes["post-created-by"]}>created by သုခ</p>
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