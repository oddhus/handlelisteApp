import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { request } from 'node:http'
import { IRecipe } from '../models/recipe'
import { Iitem, IShoppingList } from '../models/ShoppingList'
import { IUser } from '../models/user'
import { store } from '../stores/store'

axios.defaults.baseURL = '/'

const responseBody = (response: AxiosResponse) => response.data
const response = (response: any) => response

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = store.commonStore.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
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
  currentUser: () =>
    requests.get('user/loggedIn').then((res) => {
      console.log(res)
      return res
    }),
}

const shoppingList = {
  postShoppingList: (shoppingList: any) =>
    requests.post('ShoppingList', shoppingList).then(response),
  updateShoppingList: (shoppingList: any, id: number) =>
    requests.put('ShoppingList/' + id, shoppingList).then(response),
  getShoppingList: (id: number) =>
    requests.get('shoppinglist/' + id).then(response),
  deleteShoppingList: (id: number) => requests.del('shoppinglist/' + id),
}

const shoppingLists = {
  getShoppingLists: () => requests.get('shoppinglist').then(response),
}

const recipe = {
  postRecipe: (recipe: IRecipe) =>
    requests.post('recipe', recipe).then((res) => res),
  updateRecipe: (recipe: IRecipe, id: number) =>
    requests.put('recipe/' + id, recipe).then(response),
  getRecipe: (id: number) => requests.get('recipe/' + id).then(response),
  deleteRecipe: (id: number) => requests.del('recipe/' + id).then(response),
}

const recipes = {
  getAllUserRecipes: (id: number) =>
    requests.get('recipe/user/' + id).then(response),
  getAllRecipes: () => requests.get('recipe/all').then(response),
}

const myKitchen = {
  addItemToMyKitchen: (item: Iitem) =>
    requests.post('mykitchen', item).then(response),

  updateItemInMyKitchen: (id: number) =>
    requests.put('mykitchen/' + id, {}).then(response),

  getMyKitchen: () => requests.get('mykitchen/').then(response),

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
