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

interface Props {}

interface Iitem {
    category: string,
    item: string,
    qunatity: number,
    unit: string
}

var item: Iitem = {
  category: 'meieri',
  item: 'egg',
  qunatity: 1,
  unit: 'stk',
};

var item1: Iitem = {
  category: 'Fryse',
  item: 'laks',
  qunatity: 3,
  unit: 'stk',
};

var item2: Iitem = {
  category: 'Baking',
  item: 'mjøl',
  qunatity: 2,
  unit: 'kg',
};

var item3: Iitem = {
  category: 'meieri',
  item: 'melk',
  qunatity: 3,
  unit: 'liter',
};
var dummyData: Iitem[] = [item, item1, item2, item3];

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
    var strictHeaders = Language.shoppingLists();
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

export const ListComponent: React.FC<Props> = () => {
  var lists = setupTables(dummyData);

  return (
    <div>
      {lists}
    </div>
  );
};
