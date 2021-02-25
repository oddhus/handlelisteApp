import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {Household} from "../../pages/Household";

describe('HouseholdPage', () =>{
    describe('Layout', () =>{

        it('has header of Household', () => {
            const {container} = render(<Household/>)
            const div = container.querySelector('div')
            expect(div).toHaveTextContent('Household')
        })

    })
})