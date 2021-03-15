import {makeAutoObservable, runInAction} from 'mobx'

import {IMyKitchenList} from "../models/myKitchenList";
import agent from "../api/agent";
import {Iitem} from "../models/ShoppingList";

export default class MyKitchenStore {
    myKitchenList: IMyKitchenList | null = null
    itemsInMyKitchen = new Map();
    loading: boolean = false
    
    
    
    constructor() {
        makeAutoObservable(this)
    }
    
    get itemsInMyKitchenToArray() {
        return Array.from(this.itemsInMyKitchen.values())
    }
    
    getMyKitchen = async() => {
        this.loading = true
        try {
            const myKitchenList = await agent.myKitchen.getMyKitchen()
            runInAction(() =>{
                this.myKitchenList = myKitchenList
                this.myKitchenList?.items.forEach(item =>{
                    this.itemsInMyKitchen.set(item.itemName, item)
                })
                this.loading = false
            })
        }catch (e) {
            runInAction(() => {
                this.loading = false
            })
            throw e 
        }
    }

    updateItemInMyKitchen = async (item: Iitem) =>{
        this.loading = true
        try {
            this.itemsInMyKitchen.set(item.itemName, item)
            this.loading = false
        }catch(e){
            this.loading = false
            throw e
        } 
    }

    onChangeQuantity = (item: Iitem, add: boolean) => {
        add ? item.quantity += 1 : item.quantity -= 1
        this.updateItemInMyKitchen(item)
    }

    addItemInMyKitchen = async (item: Iitem) =>{
        this.loading = true
        try {
            //const newItem = await agent.myKitchen.addItemToMyKitchen(item)
            runInAction(() => {
                this.itemsInMyKitchen.set(item.itemName, item)
                this.loading = false
            })
        }catch(e){
            runInAction(() => {
                this.loading = false
            })
            throw e
        }
    }

    deleateItemInMyKitchen = async (item: Iitem) =>{
        this.loading = true
        try {
            const newItem = await agent.myKitchen.addItemToMyKitchen(item)
            runInAction(() => {
                this.itemsInMyKitchen.delete(item.itemName)
                this.loading = false
            })
        }catch(e){
            runInAction(() => {
                this.loading = false
            })
            throw e
        }
    }
}
