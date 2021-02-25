import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {CreateRecipe} from "../../pages/CreateRecipe";

describe('CreateRecipePage', () =>{
    describe('Layout', () =>{

        it('has header of Household', () => {
            const {container} = render(<CreateRecipe/>)
            const div = container.querySelector('div')
            expect(div).toHaveTextContent('CreateRecipe')
        })

    })
})