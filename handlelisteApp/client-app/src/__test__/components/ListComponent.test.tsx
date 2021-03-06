import React from "react";
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { ListComponent } from "../../components/shoppingList/ListComponent";
import { Iitem } from "../../models/ShoppingList";
import userEvent from '@testing-library/user-event'

var item: Iitem = {
    category: 'meieri',
    product: 'egg',
    quantity: 1,
    unit: 'stk',
  }
  
  var item1: Iitem = {
    category: 'Fryse',
    product: 'laks',
    quantity: 3,
    unit: 'stk',
  }
  
  var item2: Iitem = {
    category: 'Baking',
    product: 'mjøl',
    quantity: 2,
    unit: 'kg',
  }
  
  var item3: Iitem = {
    category: 'meieri',
    product: 'melk',
    quantity: 3,
    unit: 'liter',
  }
  
  var dummyData: Iitem[] = [item, item1, item2, item3]


  var onIncrement: any, onDecrement: any, onDeleteItem: any

describe('ShoppingList', () =>{
    beforeEach(() => {
        onIncrement = onDecrement = onDeleteItem = jest.fn();
    })

    describe('Layout', () =>{
        it('contains the header meieri', () => {
            const {container} = render(<ListComponent items={dummyData} edit={false} onIncrement={onIncrement} onDecrement={onDecrement} deleteItem={onDeleteItem}/>)
            const header = container.getElementsByClassName('meieri')
            expect(header).toHaveLength(1)
            expect(header[0]).toHaveTextContent('meieri')
        })

        it('contains the correct amount of tables', () => {
            const {container} = render(<ListComponent items={dummyData} edit={false} onIncrement={onIncrement} onDecrement={onDecrement} deleteItem={onDeleteItem}/>)
            const tables = container.getElementsByTagName('Table')
            expect(tables).toHaveLength(3)
        })

        it('hides elements when edit is disabled', () => {
            const {container} = render(<ListComponent items={dummyData} edit={false} onIncrement={onIncrement} onDecrement={onDecrement} deleteItem={onDeleteItem}/>)
            const editBtns = container.getElementsByClassName('edit')
            expect(editBtns).toHaveLength(0)
        })

        it('shows elements correct when edit is enabled', () => {
            const {container} = render(<ListComponent items={dummyData} edit={true} onIncrement={onIncrement} onDecrement={onDecrement} deleteItem={onDeleteItem}/>)
            const editBtns = container.getElementsByClassName('edit')
            expect(editBtns[0]).toBeVisible()
            expect(editBtns[1]).toBeVisible()
            expect(editBtns[2]).toBeVisible()
        })

        it('hides tables as supposed to', () => {
            const { container } = render(<ListComponent items={dummyData} edit={false} onIncrement={onIncrement} onDecrement={onDecrement} deleteItem={onDeleteItem}/>)
            userEvent.click(screen.getByTestId("hide/show meieri"))
            let tableBodies = container.getElementsByTagName('Tbody')
            expect(tableBodies).toHaveLength(2)

            userEvent.click(screen.getByTestId("hide/show meieri"))
            tableBodies = container.getElementsByTagName('Tbody')
            expect(tableBodies).toHaveLength(3)
        })
    })
})