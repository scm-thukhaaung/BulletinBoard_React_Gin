import axios from "axios";
import { getItem } from "../settings/dataHandleSvc";
const POST_API = "http://localhost:8080/api" + '/posts';
const options = {
    headers: {
        'authorization': getItem('token')
    }
}

const getFindAll = () => {
    return axios.get(POST_API);
};

const getFindOne = (id: any) => {
    return axios.get(`${POST_API}/${id}`, options);
};

const postCreate = (body: any) => {
    return axios.post(POST_API, body, options);
};

const postUpdate = (body: any, id: any) => {
    return axios.put(`${POST_API}/${id}`, body, options)
}

const deletePost = (id: any) => {
    return axios.delete(`${POST_API}/${id}`, options);
};

export { getFindAll, getFindOne, postCreate, deletePost, postUpdate };
