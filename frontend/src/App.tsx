import React, { useState } from 'react';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Post from './components/Post';
import CreateArea from './components/CreateArea';

function App() {

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
      <CreateArea onAdd={addPost} />
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
}

export default App;
