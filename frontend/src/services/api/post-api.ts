import axios from "axios";
const POST_API = "http://localhost:8080/api" + '/posts';


const getFindAll = () => {
    return axios.get(POST_API);
};

const getFindOne = (id: any) => {
    return axios.get(`${POST_API}/${id}`);
};

const postCreate = (body: any) => {
    return axios.post(POST_API, body );
};

const deletePost = (id: any) => {
    return axios.delete(`${POST_API}/${id}`);
};

export { getFindAll, getFindOne, postCreate, deletePost };
