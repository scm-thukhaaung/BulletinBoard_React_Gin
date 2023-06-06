import axios from "axios";
import { getItem } from "../settings/dataHandleSvc";
const MAIL_SEND_API = "http://localhost:8080/api" + '/forget-password';
const RESET_API = "http://localhost:8080/api" + '/reset-password';

const sendEmail = (mailData: any) => {
    return new Promise((resolve, reject) => {
        axios.post(MAIL_SEND_API, mailData)
            .then(response => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const resetPassword = (pwdData: any, token: string|null) => {
    const options = {
        headers: {
            'authorization': token
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(RESET_API, pwdData, options)
            .then(response => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export {sendEmail, resetPassword};