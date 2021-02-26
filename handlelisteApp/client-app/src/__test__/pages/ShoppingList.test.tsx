import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {ShoppingList} from "../../pages/ShoppingList";

describe('ShoppingList', () =>{
    describe('Layout', () =>{

        it('has a wisible table', () => {
            const {container} = render(<ShoppingList/>)
            const table = container.querySelector('table')
            expect(table).toBeVisible();
        })

    })
})