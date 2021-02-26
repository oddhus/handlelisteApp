import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {SignIn} from "../../pages/SignIn";

const routeComponentPropsMock = {
    history: {} as any,
    location: {} as any,
    match: {} as any,
}

describe('SignInPage', () =>{
    describe('Layout', () =>{

        it('container is in the document', async () => {
            const {getByTestId} = render(<SignIn {...routeComponentPropsMock}/>)
            expect(getByTestId('login-container')).toBeInTheDocument()
        })

    })
})