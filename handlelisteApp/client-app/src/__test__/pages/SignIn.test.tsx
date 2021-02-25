import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {SignIn} from "../../pages/SignIn";

describe('SignInPage', () =>{
    describe('Layout', () =>{

        it('has header of SignIn', () => {
            const {container} = render(<SignIn/>)
            const div = container.querySelector('div')
            expect(div).toHaveTextContent('SignIn')
        })

    })
})