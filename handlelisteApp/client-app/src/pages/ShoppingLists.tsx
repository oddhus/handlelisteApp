import React from 'react';
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const ShoppingLists: React.FC<Props> = () => {
  return <div>{Language.shoppingLists()}</div>;

};
