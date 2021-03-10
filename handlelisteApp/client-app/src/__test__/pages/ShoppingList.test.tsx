import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { ShoppingList } from '../../pages/ShoppingList'

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        pathname: '/shopping-list/1',
    }),
    useParams: () => ({
        listId: 1
    }),
    }),
);

jest.mock("../../stores/store", () => ({
    useStore: () => ({
      shoppingListStore: {
        shoppingList: {
          shoppingListId: 0,
          items: [
            {
              category: 'meieri',
              product: 'melk',
              quantity: 3,
              unit: 'liter',
            }
          ]
        },
        getShoppinglist(id: number){
          return (
            [
              {
                shoppingListID: 1,
                items: [
                  {
                    category: "category",
                    product: "product",
                    quantity: 1,
                    unit: "pcs"
                  }
                ]
              }
            ]
          )
        }
      },
    }),
  }));

describe('ShoppingList', () =>{
    describe('Layout', () =>{    
        it('has a wisible table', () => {
           const {container} = render(<ShoppingList/>)
            const table = container.querySelector('table')
            expect(table).toBeVisible();
        })

    })
})