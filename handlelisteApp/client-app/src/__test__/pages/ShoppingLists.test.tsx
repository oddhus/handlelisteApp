import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ShoppingLists } from '../../pages/ShoppingLists'
import English from '../../lang/en'
import { MockLanguage } from '../MockLanguage'

jest.mock('../../stores/store', () => ({
  useStore: () => ({
    shoppingListStore: {
      shoppingLists: [],
      feedBack: {
        status: 200,
        type: 'success',
      },
      fetchShoppingLists() {},
      resetFeedBack: () => undefined,
    },
    settingStore: {
      language: { ...MockLanguage },
    },
  }),
}))

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    pathname: 'history',
  }),
}))

describe('ShoppingListsPage', () => {
  describe('Layout', () => {
    it('contains a table', () => {
      const { container } = render(<ShoppingLists />)
      const div = container.querySelector('table')
      expect(div).toBeVisible()
    })
  })
})
