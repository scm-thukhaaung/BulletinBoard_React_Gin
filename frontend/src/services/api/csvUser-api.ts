import axios from "axios";
import { UserInterface } from "../../interfaces/UserInterface";
import { getItem } from "../settings/dataHandleSvc";
const CSVUSER_API = "http://localhost:8080/api" + "/users/csv-users";
const options = {
    headers: {
        'authorization': getItem('token')
    }
}

const csvUserCreate = (csvUserList: { Users: UserInterface[]; }) => {
    return axios.post(CSVUSER_API, csvUserList, options);
}

export { csvUserCreate };
