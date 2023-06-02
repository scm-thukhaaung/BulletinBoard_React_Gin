import axios from "axios";
import { UserInterface } from "../../interfaces/UserInterface";
const USER_API = "http://localhost:8080/api" + "/users";

const createUser = (userData: UserInterface) => {
    return axios.post(USER_API, userData)
}
const getFindAll = () => {
    return axios.get(USER_API);
};

const getFindOne = (id: number) => {
    console.log('id in service-=-> ', id)
    return axios.get(`${USER_API}/${id}`);
};

// const postCreate = (body: any) => {
//     return axios.post(USER_API, body );
// };

const deleteUser = (id: number) => {
    return axios.delete(`${USER_API}/${id}`);
};

const updateUser = (userData: UserInterface, id: any)=> {
    return axios.put(`${USER_API}/${id}`, userData)
}

export { createUser, getFindAll, getFindOne, updateUser, deleteUser };
