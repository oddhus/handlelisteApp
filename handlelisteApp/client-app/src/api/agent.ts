import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {IUser} from "../models/user";
import {store} from "../stores/store";

axios.defaults.baseURL = '/'

const responseBody = (response: AxiosResponse) => response.data;

// @ts-ignore
axios.interceptors.request.use((config: AxiosRequestConfig) => {
        const token = store.commonStore.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const User = {
    getUsers: (): Promise<IUser> => requests.get('user'),
    signUp: (user: IUser) => requests.post('user', user),
    login: (loginDetails: any) => requests.post('/user/login', loginDetails),
    currentUser: () => requests.get('user/loggedIn')
}


export default {
    User
}
