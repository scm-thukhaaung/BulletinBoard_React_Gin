import axios from "axios";
import { removeItem } from "../settings/dataHandleSvc";
const LOGIN_API = "http://localhost:8080/api" + '/login';

const login = (loginData: any) => {
  return axios.post(LOGIN_API, loginData);
}

const logout = () => {
  removeItem('user');
  removeItem('token');
}


export { login, logout };
