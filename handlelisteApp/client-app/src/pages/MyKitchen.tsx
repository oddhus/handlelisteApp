import React, {useState} from "react"
import {observer} from "mobx-react-lite";

import {MyKitchenItems} from "../components/MyKitchen/MyKitchenItems";
import {Iitem} from "../models/ShoppingList";

interface Props {
 
}

export const MyKitchen: React.FC<Props> = observer(() => {

    const item: Iitem = {
        category: 'meieri',
        itemName: "melk",
        quantity: 1,
        unit: 'stk',
        hasBeenBought: false,
    }

    const item1: Iitem = {
        category: 'Fryse',
        itemName: "fisk",
        quantity: 3,
        unit: 'stk',
        hasBeenBought: false,
    }

    const item2: Iitem = {
        category: 'Baking',
        itemName: "brød",
        quantity: 2,
        unit: 'kg',
        hasBeenBought: false,
    }

    const item3: Iitem = {
        category: 'meieri',
        itemName: "smør",
        quantity: 3,
        unit: 'liter',
        hasBeenBought: false,
    }

    const items = [item, item1, item2, item3]

    const [data, setData] = useState()
    
    
    const onDecrement = (item: Iitem) => {
        
    }

    const onIncrement = (item: Iitem) => {
    }
    
    return (
        <MyKitchenItems 
            items={items} 
            edit={true} 
            onIncrement={() =>{}} 
            onDecrement={() =>{}} 
            deleteItem={() =>{}} 
            onChecked={() =>{}}/>
    )
})