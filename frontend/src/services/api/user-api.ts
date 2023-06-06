import axios from "axios";
import { UserInterface } from "../../interfaces/UserInterface";
import { getItem } from "../settings/dataHandleSvc";
const USER_API = "http://localhost:8080/api" + "/users";
const options = {
    headers: {
        'authorization': getItem('token')
    }
}

const createUser = (userData: UserInterface) => {
    return axios.post(USER_API, userData, options)
}
const getFindAll = () => {
    return axios.get(USER_API, options);
};

const getFindOne = (id: number) => {
    return axios.get(`${USER_API}/${id}`, options);
};

const deleteUser = (id: number) => {
    return axios.delete(`${USER_API}/${id}`,options);
};

const updateUser = (userData: UserInterface, id: any)=> {
    return axios.put(`${USER_API}/${id}`, userData, options)
}

export { createUser, getFindAll, getFindOne, updateUser, deleteUser };
