import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import CreatePostArea from "../../components/CreatePostArea/CreatePostArea";
import Post from "../../components/Post/Post";
import { getPostsError, getPostsStatus, selectAllPosts } from "../../store/Slices/postsSlice";

const HomePage = (props: any) => {
    const apiPosts = useSelector(selectAllPosts);
    const apiPostsStatus = useSelector(getPostsStatus);
    const apiPostsError = useSelector(getPostsError);

    const [posts, setPosts] = useState<any>(apiPosts);


    const deletePost = (id: any) => {
        setPosts(
            (prevPosts: any[]) => {
                return prevPosts.filter((prevItem, index) => {
                    return index !== id;
                });
            }
        );
    };

    return (
        <>
            <Header />
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