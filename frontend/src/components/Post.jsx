import "../css/style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

const Post = props => {

    const handleClick = (props) => {
        props.onDelete(props.id);
    };

    return (
        <div className="post">
            <h2>" {props.title} "</h2>
            <p>{props.description}</p>

            <p className="post-created-by">created by သုခ</p>
            <button className="post-delete-btn" onClick={handleClick}>
                <DeleteIcon />
            </button>
            <button className="post-update-btn" onClick={handleClick}>
                <EditIcon />
            </button>
        </div>
    );
};

export default Post;