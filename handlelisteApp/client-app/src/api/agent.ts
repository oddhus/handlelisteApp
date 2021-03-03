import axios, { AxiosResponse } from "axios";
import {IUser} from "../models/user";

axios.defaults.baseURL='/'

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const User = {
    getUsers : (): Promise<IUser> => requests.get('user'),
    signUp : (user: IUser) => requests.post('user', user),
    login : (loginDetails:any) => requests.post('/user/login', loginDetails)
}


export default {
    User
}
