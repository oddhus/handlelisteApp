import { IitemInRecipe } from "../models/recipe"


export function translateUnit (itemList: IitemInRecipe[]) {
    const language = localStorage.getItem('lang')
    switch (language){
        case 'en':
            translateFromNo(itemList)
            break;
        case 'no':
            translateFromEn(itemList)
            break;
    }
}

function translateFromNo(itemList: IitemInRecipe[]){
    itemList.forEach(item => {
       switch (item.unit){
           case 'STK':
               item.unit = "PCS"
               break; 
           case 'PK':
               item.unit = 'PCK'
               break;
            case 'SS':
                item.unit = 'TBSP'
                break;
            case 'TS':
                item.unit = 'TSP'
                break;
       }
   })
}

function translateFromEn(itemList: IitemInRecipe[]){
    itemList.forEach(item => {
        switch (item.unit){
            case 'PCS':
                item.unit = "STK"
                break; 
            case 'PCK':
                item.unit = 'PK'
                break;
             case 'TBSP':
                 item.unit = 'SS'
                 break;
             case 'TSP':
                 item.unit = 'TS'
                 break;
        }
    })
}