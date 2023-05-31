import axios from "axios";
import { User } from "../../interfaces/UserInterface";
import { getItem } from "../settings/dataHandleSvc";
const USER_API = "http://localhost:8080/api" + '/users';
const options = {
    headers: {
        // 'authorization': getItem('token')
    }
}


const getAllUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        axios.get(USER_API, options)
          .then(response => {
            console.log('users -=> ', response.data.data)
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    // return axios.get(USER_API, options);

const getOneUser = (id: any) => {
    return axios.get(`${USER_API}/${id}`);
}

const postCreate = (body: any) => {
    return axios.post(USER_API, {...body});
}


export { getAllUsers, getOneUser, postCreate  };
