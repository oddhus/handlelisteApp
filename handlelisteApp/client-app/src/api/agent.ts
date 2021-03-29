import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import { IRecipe } from '../models/recipe'
import { Iitem, IShoppingList } from '../models/ShoppingList'
import { IUser } from '../models/user'
import { store } from '../stores/store'
import {history} from "../index";
import { useToast } from "@chakra-ui/react"

axios.defaults.baseURL = '/'

const responseBody = (response: AxiosResponse) => response.data
//const response = (response: any) => response

// @ts-ignore
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = store.commonStore.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(async ( response) => {
  return response
}, (error:AxiosError) => {
  const {data, status} = error.response!;
  
  switch(status) {
    //need to test if this is working
    case 400: //bad request
        if(typeof data === 'string'){
          useToast({
            title: 'Bad request',
          })
        }
        if(data.errors){
          const modalErrors = [];
          for (const key in data.errors){
            if(data.errors[key]){
              modalErrors.push(data.errors[key]);
            }
          }
          throw modalErrors.flat()
        } 
      break;
    case 401: // unauthorised
        history.push('/unauthorised')
      break;
    case 404: // not found
        history.push('/nomatch')
      break;
    case 500: //server error
        store.commonStore.setServerError(data)
        history.push('/server-error')
      break;
  }
  return Promise.reject(error)
})

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
}

const User = {
  getUsers: (): Promise<IUser> => requests.get('user'),
  signUp: (user: IUser) => requests.post('user', user),
  login: (loginDetails: any) => requests.post('user/login', loginDetails),
  currentUser: () => requests.get('user/loggedIn'),
}

const shoppingList = {
  postShoppingList: (shoppingList: any) =>
    requests.post('ShoppingList', shoppingList),
  updateShoppingList: (shoppingList: IShoppingList, id: number) =>
    requests.put('ShoppingList/' + id, shoppingList),
  getShoppingList: (id: number) => requests.get('shoppinglist/' + id),
  deleteShoppingList: (id: number) => requests.del('shoppinglist/' + id),
  CreateOrUpdateItemInShoppingList: (shoppingListID: number, item: Iitem) => 
      requests.post('shoppinglist/' + shoppingListID + '/item', item),
}

const shoppingLists = {
  
  getShoppingLists: () => requests.get('shoppinglist'),
}

const recipe = {
  postRecipe: (recipe: IRecipe) => requests.post('recipe', recipe),
  updateRecipe: (recipe: IRecipe, id: number) =>
    requests.put('recipe/' + id, recipe),
  getRecipe: (id: number) => requests.get('recipe/' + id),
  deleteRecipe: (id: number) => requests.del('recipe/' + id),
}

const recipes = {
  getAllUserRecipes: (id: number) => requests.get('recipe/user/' + id),
  getAllRecipes: () => requests.get('recipe/all'),
}

const myKitchen = {
  addItemToMyKitchen: (item: Iitem) => requests.post('mykitchen', item),
  updateItemInMyKitchen: (id: number) => requests.put('mykitchen/' + id, {}),
  getMyKitchen: () => requests.get('mykitchen/'),
  deleteItemInMyKitchen: (id: number) => requests.del('mykitchen/' + id),
}

export default {
  User,
  shoppingList,
  shoppingLists,
  recipe,
  recipes,
  myKitchen,
}
