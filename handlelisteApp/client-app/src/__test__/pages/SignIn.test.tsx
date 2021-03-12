import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SignIn } from '../../pages/SignIn'
import English from '../../lang/en'
import { MockLanguage } from '../MockLanguage'

const routeComponentPropsMock = {
  history: {} as any,
  location: {} as any,
  match: {} as any,
}

//Mock the store returned from the useStore hook. In this case only null is returned.
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

const renderSignInPage = <SignIn {...routeComponentPropsMock} />

describe('SignInPage', () => {
  describe('Layout', () => {
    it('container is in the document', async () => {
      //useStore.mockReturnValue(dummyStores);
      const { getByTestId } = render(renderSignInPage)
      expect(getByTestId('login-container')).toBeInTheDocument()
    })

    it('has input of Email address', async () => {
      const { queryByPlaceholderText } = render(renderSignInPage)
      const emailAddressInput = queryByPlaceholderText('Email address')
      expect(emailAddressInput).toBeInTheDocument()
    })

    it('has label of Your Password', async () => {
      const { queryByPlaceholderText } = render(renderSignInPage)
      const passwordInput = queryByPlaceholderText('Your password')
      expect(passwordInput).toBeInTheDocument()
    })

    it('has input of password', async () => {
      const { queryByPlaceholderText } = render(renderSignInPage)
      const passwordInput = queryByPlaceholderText('Your password')
      expect(passwordInput!.type).toBe('password')
    })

    it('has login button', async () => {
      const { getByTestId } = render(renderSignInPage)
      expect(getByTestId('login-Button')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    const changeEnvent = (content: any) => {
      return {
        target: {
          value: content,
        },
      }
    }

    it('sets the username value into state', () => {
      const { queryByPlaceholderText } = render(renderSignInPage)
      const emailAddressInput = queryByPlaceholderText('Email address')
      fireEvent.change(emailAddressInput!, changeEnvent('my-email-address'))
      expect(emailAddressInput).toHaveValue('my-email-address')
    })

    it('sets the password value into state', () => {
      const { queryByPlaceholderText } = render(renderSignInPage)
      const passwordInput = queryByPlaceholderText('Your password')
      fireEvent.change(passwordInput!, changeEnvent('password'))
      expect(passwordInput).toHaveValue('password')
    })
  })
})
