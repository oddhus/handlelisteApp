import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {Recipes} from "../../pages/Recipes";

describe('RecipesPage', () =>{
    describe('Layout', () =>{

        it('has header of Recipes', () => {
            const {container} = render(<Recipes/>)
            const div = container.querySelector('div')
            expect(div).toHaveTextContent('Recipes')
        })

    })
})