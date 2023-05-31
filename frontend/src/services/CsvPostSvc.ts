import axios from 'axios';
import { Post } from '../interfaces/PostInterface';
import { getItem, setItem } from './DataHandlingSvc';

const CsvPostSvc = async (postList: Post[]) => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      'content-type': 'application/json;',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm5hbWUiOiJBZG1pbiIsImV4cCI6MTY4NTUwNjAxMn0.pPN-pIr7pV9zsm75qnn3rmAuRN28vgnr6VOjJ9EeBlU'
    },
  });

  // for temp purpose
  const userData = {
    "ID": 1,
    "CreatedAt": "2023-01-01T00:00:00+06:30",
    "UpdatedAt": "2023-01-01T00:00:00+06:30",
    "DeletedAt": null,
    "Name": "Admin",
    "Email": "admin@gmail.com",
    "Password": "Admin123",
    "Profile_Photo": "",
    "Type": "0",
    "Phone": "",
    "Address": "",
    "Date_Of_Birth": "0001-01-01T00:00:00Z",
    "Created_User_ID": 1,
    "Updated_User_ID": 1,
    "Deleted_User_ID": 0,
    "Post": null
  }
  setItem('user', userData)
  setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm5hbWUiOiJBZG1pbiIsImV4cCI6MTY4NTUwNjAxMn0.pPN-pIr7pV9zsm75qnn3rmAuRN28vgnr6VOjJ9EeBlU")

  const data = postList.map((eachPost: Post) => {
    const updatedPost: Post = {
      ...eachPost,
      Created_User_ID: getItem('user').ID,
      Updated_User_ID: getItem('user').ID,

    };
    return updatedPost;
  });

  const reqData = {
    Posts : data
  }


  // Make a Post request
  instance.post('/posts/csv-posts', reqData)
    .then(response => {
      // Handle the response data
      console.log(response.data);
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });

}


export default CsvPostSvc;