import { useState } from "react";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import CreatePostArea from "../../components/CreatePostArea/CreatePostArea";
import Post from "../../components/Post/Post";

const HomePage = (props: any) => {
    const [posts, setPosts] = useState<any>([]);

    const addPost = (newPost: any) => {
        setPosts(
            (prevPosts: any[]) => {
                return [...prevPosts, newPost];
            });
    };

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
            <CreatePostArea onAdd={addPost} />
            <div className='posts-area clearfix'>
                {posts.map((postItem: { title: any; description: any; }, index: any) => {
                    return (
                        <Post
                            key={index}
                            id={index}
                            title={postItem.title}
                            description={postItem.description}
                            onDelete={deletePost}
                        />
                    );
                })}
            </div>
            <Footer />
        </>
    );
};

export default HomePage;