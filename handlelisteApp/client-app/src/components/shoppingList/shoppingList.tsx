import React from 'react';
import {Language} from '../../lang/ActiveLanguage';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons'
import {Iitem} from "../../models/ShoppingList"


interface Props {
  items: Iitem[]
}



function setupTableBody(itemsList: Iitem[]) {
  return itemsList.map((items) => (
    <Tr key={items.item}>
      <Td>
        <Checkbox colorScheme='green' />
      </Td>
      <Td>{items.item}</Td>
      <Td>{items.qunatity}</Td>
      <Td>{items.unit}</Td>
    </Tr>
  ));
}

function getListOfCategories(itemsList: { category: string }[]) {
  let categoryList: string[] = []
  itemsList.map((items) => {
    if (!categoryList.includes(items.category)) {
      categoryList.push(items.category);
    }
  });
  return categoryList;
}

function setupTables(itemsList: Iitem[]){
    var categories: string[] = getListOfCategories(itemsList)
    var tables: React.ReactFragment[] = []
    var strictHeaders = Language.shoppingList();
    categories.map(category => {
        let categorizedItems: Iitem[] = []
        itemsList.map(item => {
            if(category === item.category){
                categorizedItems.push(item)
            }  
        })
        tables.push(
            <div key={category}>
                <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th><ArrowDownIcon/></Th>
                    <Th>{category}</Th>
                    <Th>{strictHeaders[0]}</Th>
                    <Th>{strictHeaders[1]}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {
                        setupTableBody(categorizedItems)
                    }
                </Tbody>
              </Table>
              <br/>
              </div>
        )
    })
    return tables
    }

export const ListComponent: React.FC<Props> = ({items}) => {
  var lists = setupTables(items);

  return (
    <div>
      {lists}
    </div>
  );
};
