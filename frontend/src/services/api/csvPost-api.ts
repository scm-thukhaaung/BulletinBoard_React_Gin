import axios from "axios";
import { Post } from "../../interfaces/PostInterface";
import { getItem } from "../settings/dataHandleSvc";
const CSVPOST_API = "http://localhost:8080/api" + "/posts/csv-posts";
const options = {
    headers: {
        'Authorization': getItem('token')
    }
}

const csvPostCreate = (csvPostList: { Posts: Post[]; }) => {
    return axios.post(CSVPOST_API, csvPostList, options);
}

export { csvPostCreate };
