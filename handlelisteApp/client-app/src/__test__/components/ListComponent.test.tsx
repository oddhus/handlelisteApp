import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Iitem } from '../../models/ShoppingList'
import userEvent from '@testing-library/user-event'
import { MockLanguage } from '../MockLanguage'
import { ShoppingList } from '../../components/shoppingList/ShoppingList'

var item: Iitem = {
  category: 'meieri',
  itemName: 'egg',
  quantity: 1,

  hasBeenBought: false,
}

var item1: Iitem = {
  category: 'Fryse',
  itemName: 'laks',
  quantity: 3,

  hasBeenBought: false,
}

var item2: Iitem = {
  category: 'Baking',
  itemName: 'mjøl',
  quantity: 2,

  hasBeenBought: false,
}

var item3: Iitem = {
  category: 'meieri',
  itemName: 'melk',
  quantity: 3,

  hasBeenBought: false,
}

var dummyData: Iitem[] = [item, item1, item2, item3]

var onIncrement: any, onDecrement: any, onDeleteItem: any, onDelete

jest.mock('../../stores/store', () => ({
  useStore: () => ({
    settingStore: {
      language: { ...MockLanguage },
    },
    shoppingListStore: {
      onDeleteItem: jest.fn(),
      shoppingList: {
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
          {
            category: 'meieri',
            itemName: 'melk',
            quantity: 1,
            unit: 'liter',
            hasBeenBought: false,
            itemIdentifier: '1234',
          },
        ],
      },
    },
  }),
}))

describe('ShoppingList', () => {
  beforeEach(() => {
    onIncrement = onDecrement = onDeleteItem = jest.fn()
  })

  describe('Layout', () => {
    it('contains item melk', async () => {
      const { findAllByText } = render(<ShoppingList />)
      const result = await findAllByText('melk')
      expect(result).toHaveLength(1)
    })

    it('contains the correct amount of items', async () => {
      const { findAllByDisplayValue } = render(<ShoppingList />)
      const items = await findAllByDisplayValue(1)
      expect(items).toHaveLength(2)
    })

    // it('hides elements when edit is disabled', async () => {
    //   const { getAllByLabelText } = render(<ShoppingListItems />)

    //   const spy = jest.spyOn(store.useStore().shoppingListStore, 'onDeleteItem')
    //   const link = getAllByLabelText('delete item')[0]
    //   link.simul

    //   expect(spy).toHaveBeenCalled()
    // })

    // it('shows elements correct when edit is enabled', () => {
    //   const { container } = render(<ShoppingListItems />)
    //   const editBtns = container.getElementsByClassName('edit')
    //   expect(editBtns[0]).toBeVisible()
    //   expect(editBtns[1]).toBeVisible()
    //   expect(editBtns[2]).toBeVisible()
    // })

    // it('hides tables as supposed to', () => {
    //   const { container } = render(<ShoppingListItems />)
    //   userEvent.click(screen.getByTestId('hide/show meieri'))
    //   let tableBodies = container.getElementsByTagName('Tbody')
    //   expect(tableBodies).toHaveLength(2)

    //   userEvent.click(screen.getByTestId('hide/show meieri'))
    //   tableBodies = container.getElementsByTagName('Tbody')
    //   expect(tableBodies).toHaveLength(3)
    // })
  })
})
