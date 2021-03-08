import React from 'react';
import {Language} from '../lang/ActiveLanguage';
import { useHistory } from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";
import {
  Button,
  Table,
  Tbody,
  Td,
  Tr,
  Thead,
  Th,
  Container,
} from '@chakra-ui/react';
import { Iitem, IShoppingList } from '../models/ShoppingList';
import { variantPriorityOrder } from 'framer-motion/types/render/utils/animation-state';

interface Props {}

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

var list1: IShoppingList = {
  shoppingListID: 1,
  items: dummyData,
  createdOn: '2021-01-07T18:26:46.297Z',
  updatedOn: '2021-03-10T00:30:46.297Z'
}

var list2: IShoppingList = {
  shoppingListID: 2,
  items: dummyData,
  createdOn: '2021-06-07T18:26:46.297Z',
  updatedOn: '2021-20-10T00:30:46.297Z'
}


var dummyLists: IShoppingList[] = [list1, list2]

var fetched = false

export const ShoppingLists: React.FC<Props> = observer(() => {
  const history = useHistory();
  const { shoppingListStore } = useStore();
  console.log(fetched)
  if(!fetched){
    shoppingListStore.fetchShoppingLists()
    fetched = true
  }

  return (
    <Container maxW='container.md'>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th
            fontSize={'xl'}
            textAlign={[ 'center' ]}
            >{Language.myShoppingLists()}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shoppingListStore.shoppingLists.map((shoppingList) => {
            return (
              <Tr key={shoppingList.shoppingListID}>
                <Td>
                  <Button 
                  fontSize={'lg'} 
                  colorScheme="teal" 
                  variant="link"
                  onClick={() => {
                    shoppingListStore.setCurrentShoppingList(shoppingList)
                    history.push('shopping-list/' + shoppingList.shoppingListID)
                  }}
                  >
                    {shoppingList.updatedOn}
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Button
        size="lg"
        colorScheme="blue"
        onClick={() => history.push("shopping-list/new-shopping-list")}
      >
        Button
      </Button>
      </Container>
  );
})
