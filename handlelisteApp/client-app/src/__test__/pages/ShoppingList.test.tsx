import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {ShoppingList} from "../../pages/ShoppingList";

describe('SignUpPage', () =>{
    describe('Layout', () =>{

        it('has header of ShoppingList', () => {
            const {container} = render(<ShoppingList/>)
            const div = container.querySelector('div')
            expect(div).toHaveTextContent('ShoppingList')
        })

    })
})