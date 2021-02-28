import React from "react";
import {Language} from '../lang/ActiveLanguage';
import { ListComponent } from "../components/shoppingList/shoppingList"
import {Iitem} from "../models/ShoppingList"

interface Props {}

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

export const ShoppingList: React.FC<Props> = () => {
  return <div>
        <ListComponent items={dummyData}/>
  </div>;
};
