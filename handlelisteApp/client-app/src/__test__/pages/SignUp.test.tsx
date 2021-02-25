import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {SignUp} from "../../pages/SignUp";

describe('SignUpPage', () =>{
    describe('Layout', () =>{
        
        it('has header of sign up', () => {
            const {container} = render(<SignUp/>)
            const div = container.querySelector('div')
            expect(div).toHaveTextContent('SignUp')
        })
        
    })
})