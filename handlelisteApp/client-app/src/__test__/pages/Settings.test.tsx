import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {Settings} from "../../pages/Settings";

describe('SettingPage', () =>{
    describe('Layout', () =>{

        it('has header of Settings', () => {
            const {container} = render(<Settings/>)
            const div = container.querySelector('div')
            expect(div).toHaveTextContent('Settings')
        })

    })
})