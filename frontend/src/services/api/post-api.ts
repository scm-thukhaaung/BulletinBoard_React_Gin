import axios from "axios";
const USER_API = "http://localhost:8080/api" + '/posts';


const getFindAll = () => {
    return axios.get(USER_API);
}

const getFindOne = (id: any) => {
    return axios.get(`${USER_API}/${id}`);
}

const postCreate = (body: any) => {
    return axios.post(USER_API, {...body});
}


export { getFindAll, getFindOne, postCreate  };
