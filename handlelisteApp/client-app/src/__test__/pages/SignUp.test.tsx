import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SignUp } from '../../pages/SignUp'
import English from '../../lang/en'
import { ILanguage } from '../../lang/Language'
import { MockLanguage } from '../MockLanguage'
import {act} from "react-dom/test-utils";

const routeComponentPropsMock = {
  history: {} as any,
  location: {} as any,
  match: {} as any,
}

const renderSignUpPage = <SignUp {...routeComponentPropsMock} />
const english: ILanguage = new English()

jest.mock('../../stores/store', () => ({
  useStore: () => ({
    userStore: {
      loading: true,
    },
    settingStore: {
      language: { ...MockLanguage },
    },
  }),
}))

describe('SignUpPage', () => {
  describe('Layout', () => {
    it('has header of sign up', () => {
      const { getByTestId } = render(renderSignUpPage)
      expect(getByTestId('signup-container')).toHaveTextContent('Sign up')
    })
    it('has input display email address', () => {
      const { queryByPlaceholderText } = render(renderSignUpPage)
      const dislayEmailInput = queryByPlaceholderText('Email address')
      expect(dislayEmailInput).toBeInTheDocument()
    })

    it('has input display username', () => {
      const { queryByPlaceholderText } = render(renderSignUpPage)
      const displayUsernameInput = queryByPlaceholderText('Your username')
      expect(displayUsernameInput).toBeInTheDocument()
    })
  
    it('has input display password', () => {
      const { queryByPlaceholderText } = render(renderSignUpPage)
      const displayPasswordInput = queryByPlaceholderText('Password')
      expect(displayPasswordInput).toBeInTheDocument()
    })
    it('has password type of password', () => {
      const { queryByPlaceholderText } = render(renderSignUpPage)
      const displayPasswordInput = queryByPlaceholderText('Password')
      expect(displayPasswordInput!.type).toBe('password')
    })
    
    it('has Signup button', () => {
      const { getByTestId } = render(renderSignUpPage)
      expect(getByTestId('signup-button')).toBeInTheDocument()
    })
  })
describe('Interactions', () => {
    const changeEvent = (content: string) => {
      return {
        target: {
          value: content,
        },
      }
    }

    it('set email value into the state', () => {
      const { queryByPlaceholderText } = render(renderSignUpPage)
      const displayEmailInput = queryByPlaceholderText('Email address')
      
      act(() =>{
        fireEvent.change(displayEmailInput!, changeEvent('Email'))  
      })
      expect(displayEmailInput).toHaveValue('Email')
    })

    it('set username value into the state', () => {
      const { queryByPlaceholderText } = render(renderSignUpPage)
      const displayUsernameInput = queryByPlaceholderText('Your username')
      
      act(() =>{
        fireEvent.change(displayUsernameInput!, changeEvent('Your username'))
      })

      expect(displayUsernameInput).toHaveValue('Your username')
    })

    it('set password value into the state', () => {
      const { queryByPlaceholderText } = render(renderSignUpPage)
      const displayPasswordInput = queryByPlaceholderText('Password')
      act(() =>{
        fireEvent.change(displayPasswordInput!, changeEvent('pas4word'))
      })
      expect(displayPasswordInput).toHaveValue('pas4word')
    })
  })
})
