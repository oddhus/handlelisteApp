import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {ShoppingLists} from "../../pages/ShoppingLists";

describe('ShoppingListsPage', () =>{
    describe('Layout', () =>{

        it('has header of ShoppingLists', () => {
            const {container} = render(<ShoppingLists/>)
            const div = container.querySelector('div')
            expect(div).toHaveTextContent('ShoppingLists')
        })

    })
})