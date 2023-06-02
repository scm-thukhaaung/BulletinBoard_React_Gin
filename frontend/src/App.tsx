import { useSelector } from 'react-redux';
import HomePage from './pages/Home/HomePage';

import * as post from './services/api/post-api';
import { getuserListData } from './store/Slices/usersSlice';
const App = () => {
  const storedList = useSelector(getuserListData);
  console.log(storedList, "storedList----App")
  post.getFindAll().then(data => console.log(data.data, "---Posts"));

  return (
    <HomePage />
  );
};

export default App;
