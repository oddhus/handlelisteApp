import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ShoppingList } from '../../pages/ShoppingList'
import { MockLanguage } from '../MockLanguage'

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/shopping-list/1',
  }),
  useParams: () => ({
    listId: 1,
  }),
}))

jest.mock('../../stores/store', () => ({
  useStore: () => ({
    shoppingListStore: {
      shoppingList: {
        shoppingListId: 0,
        items: [
          {
            category: 'meieri',
            itemName: 'melk',
            quantity: 3,
            unit: 'liter',
            hasBeenBought: false,
          },
        ],
      },
      feedBack: {
        status: 200,
        type: 'success',
      },
      getShoppinglist(id: number) {
        return [
          {
            shoppingListID: 1,
            items: [
              {
                category: 'category',
                itemName: 'product',
                quantity: 1,
                unit: 'pcs',
                hasBeenBought: false,
              },
            ],
          },
        ]
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
      const { container } = render(<ShoppingList />)
      const table = container.querySelector('table')
      expect(table).toBeVisible()
    })
  })
})
