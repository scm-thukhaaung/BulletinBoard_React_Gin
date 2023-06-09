import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json';

let store: any;

export const injectStore = (_store: any) => {
    store = _store
}

axios.interceptors.request.use(async (config:any) => {
    const authUser = store.getState().auth;

    if(authUser.token) {
        config.headers.Authorization = 'Bearer ' + authUser.token;
    }

    return config;
}, (error: any) => {
    return error;
});

export default axios;