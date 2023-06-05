import { useState } from "react";
import classes from "./SearchUserArea.module.css";

const SearchUserArea = (props) => {
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
        if (post.title === "" && post.description === "") return;
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
    };

    const [startDateInputType, setStartDateInputType] = useState('text');

    const startDateHandleFocus = () => {
        setStartDateInputType('date');
    };

    const startDateHandleBlur = () => {
        setStartDateInputType('text');
    };

    const [endDateInputType, setEndDateInputType] = useState('text');

    const endDateHandleFocus = () => {
        setEndDateInputType('date');
    };

    const endDateHandleBlur = () => {
        setEndDateInputType('text');
    };

    return (
        <div className={classes["search-user-component"]}>
            <form className={classes["search-user-form"]}>

                <input
                    name="name"
                    onChange={handleChange}
                    placeholder={isExpanded ? "အမည်" : "အသုံးပြုသူများ ကို ရှာဖွေမည်..."}
                    onClick={expand}
                    value={post.description}
                />

                {
                    isExpanded && (
                        <>
                            <input name="email" placeholder="အီးမေးလ်" />
                            <div className={classes["start-end-date-div"]}>
                                <input type={startDateInputType} onFocus={startDateHandleFocus}
                                    onBlur={startDateHandleBlur} placeholder="ရက် အစ" />
                                <input type={endDateInputType} onFocus={endDateHandleFocus}
                                    onBlur={endDateHandleBlur} placeholder="ရက် အဆုံး" />
                            </div>
                            <div className={classes["btn-div"]}>
                                <button className={classes["search-btn"]} type="button" onClick={closeExpand}>
                                    ပိတ်မည်...
                                </button>
                                <button className={classes["search-btn"]} type="button">
                                    ရှာ မည်...
                                </button>
                            </div>
                        </>
                    )
                }
            </form>
        </div>
    );
};

export default SearchUserArea;