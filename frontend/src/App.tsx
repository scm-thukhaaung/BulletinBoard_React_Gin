import React from 'react';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Post from './components/Post';

function App() {
  return (
    <>
      <Header />
        <Post />
        <Post />
        <Post />
      <Footer />
    </>

  );
}

export default App;
