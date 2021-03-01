import React, { ChangeEvent, useState } from 'react';
import { Language } from '../lang/ActiveLanguage';
import { ListComponent } from '../components/shoppingList/shoppingList';
import { AddItem } from '../components/shoppingList/AddItem';
import { Iitem } from '../models/ShoppingList';

interface Props {}

var item: Iitem = {
  category: 'meieri',
  product: 'egg',
  qunatity: '1',
  unit: 'stk',
};

var item1: Iitem = {
  category: 'Fryse',
  product: 'laks',
  qunatity: '3',
  unit: 'stk',
};

var item2: Iitem = {
  category: 'Baking',
  product: 'mjøl',
  qunatity: '2',
  unit: 'kg',
};

var item3: Iitem = {
  category: 'meieri',
  product: 'melk',
  qunatity: '3',
  unit: 'liter',
};
var dummyData: Iitem[] = [item, item1, item2, item3];

export const ShoppingList: React.FC<Props> = () => {
  const [data, setData] = useState(dummyData);

  const onAdd = (item: Iitem) => {
    dummyData.push(item);
    setData([...dummyData]);
  };

  return (
    <div>
      <ListComponent items={dummyData} />
      <AddItem onAdd={onAdd} />
    </div>
  );
};
