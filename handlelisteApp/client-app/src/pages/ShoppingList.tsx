import React from "react";
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const ShoppingList: React.FC<Props> = () => {
  return <div>{Language.shoppingList()}</div>;
};
