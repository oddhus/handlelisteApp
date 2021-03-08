import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {ShoppingLists} from "../../pages/ShoppingLists";


jest.mock("../../stores/store", () => ({
    useStore: () => ({
      shoppingListStore: {
        shoppingLists: [],
        fetchShoppingLists(){},
      },
    }),
  }));

describe('ShoppingListsPage', () =>{
    describe('Layout', () =>{

        it('contains a table', () => {
            const {container} = render(<ShoppingLists/>)
            const div = container.querySelector('table')
            expect(div).toBeVisible
        })

    })
})