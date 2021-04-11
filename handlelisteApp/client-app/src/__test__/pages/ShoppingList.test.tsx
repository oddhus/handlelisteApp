import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ShoppingListPage } from '../../pages/ShoppingList'
import { MockLanguage } from '../MockLanguage'

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/shopping-list/1',
  }),
  useParams: () => ({
    listId: 1,
  }),
  useHistory: () => ({
    pathname: 'history',
  }),
}))

jest.mock('../../stores/store', () => ({
  useStore: () => ({
    shoppingListStore: {
      resetBackToShoppingList: () => undefined,
      shoppingList: {
        shoppingListId: 0,
        items: [
          {
            category: 'meieri',
            itemName: 'melk',
            quantity: 3,
            unit: 'liter',
            hasBeenBought: false,
            itemIdentifier: '123',
          },
        ],
      },
      feedBack: {
        text: 'Bra',
        status: 'success',
      },
      getShoppinglist(id: number) {
        return new Promise((resolve, reject) => {
          process.nextTick(() =>
            id === 1
              ? resolve({
                  shoppingListID: 1,
                  items: [
                    {
                      category: 'category',
                      itemName: 'product',
                      quantity: 1,
                      unit: 'pcs',
                      hasBeenBought: false,
                      itemIdentifier: '123',
                    },
                  ],
                })
              : reject({
                  error: 'Error',
                })
          )
        })
      },
      resetFeedBack: () => undefined,
    },
    settingStore: {
      language: { ...MockLanguage },
    },
  }),
}))

describe('ShoppingList', () => {
  describe('Layout', () => {
    it('has a wisible table', () => {
      const { container } = render(<ShoppingListPage />)
      const table = container.getElementsByClassName('itemList')[0]
      expect(table).toBeVisible()
    })
  })
})
