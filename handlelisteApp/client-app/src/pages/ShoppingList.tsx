import React from "react";
import {Language} from '../lang/ActiveLanguage';
import { ListComponent } from "../components/shoppingList/shoppingList"
interface Props {}

export const ShoppingList: React.FC<Props> = () => {
  return <div>
        <ListComponent/>
  </div>;
};
