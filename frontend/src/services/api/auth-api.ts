import axios from "axios";
import { User } from "../../interfaces/UserInterface";
import { removeItem } from "../settings/dataHandleSvc";
const LOGIN_API = "http://localhost:8080/api" + '/login';


// const login = (loginData: User): Promise<boolean> => {
//   return new Promise((resolve, reject) => {
//     axios.post(LOGIN_API, loginData)
//       .then(response => {
//         setItem('user', response.data.data.User);
//         setItem('token', response.data.data.Token);
//         resolve(true);
//       })
//       .catch(() => {
//         reject(new Error('Login failed.'));
//       });
//   });
// };

const login = (loginData: any) => {
  return axios.post(LOGIN_API, loginData);
}

const logout = () => {
  removeItem('user');
  removeItem('token');
}


export { login, logout };
