import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommonDialog from "../../components/common/CommonDialog/CommonDialog";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import CreatePostArea from "../../components/CreatePostArea/CreatePostArea";
import Loading from "../../components/Loading/Loading";
import Post from "../../components/Post/Post";
import { Message } from "../../consts/Message";
import { getPostsStatus, selectAllPosts } from "../../store/Slices/postsSlice";

const HomePage = (props: any) => {
    const apiPosts = useSelector(selectAllPosts);
    const apiPostsStatus = useSelector(getPostsStatus);
    const postErrSts = useSelector(getPostsStatus);
    const [postError, setPostErr] = useState(false);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (postErrSts !== 'loading') {
            setLoading(false);
        } else {
            setLoading(true);
        }
        if (postErrSts === 'failed') {
            setPostErr(true);
        }

    }, [postErrSts])

    const [setPosts] = useState<any>(apiPosts);


    const deletePost = (id: any) => {
        setPosts(
            (prevPosts: any[]) => {
                return prevPosts.filter((prevItem, index) => {
                    return index !== id;
                });
            }
        );
    };

    const handleCloseDialog = () => {
        setPostErr(false);
    }

    return (
        <>
            <Header />
            {
                isLoading && <Loading />
            }
            {
                postError && <CommonDialog message={Message.postFetchError} onClick={handleCloseDialog} />
            }
            <CreatePostArea />
            {apiPostsStatus === "succeeded" && (
                <div className='posts-area clearfix'>
                    {
                        apiPosts.map((postItem: any, index: any) => {
                            return (
                                <Post
                                    key={index}
                                    id={index}
                                    postItem={postItem}
                                    onDelete={deletePost}
                                />
                            );
                        })
                    }
                </div>
            )}
            <Footer />
        </>
    );
};

export default HomePage;