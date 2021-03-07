import React from 'react';
import {Language} from '../lang/ActiveLanguage';
import { useHistory } from "react-router-dom";

import { Button } from '@chakra-ui/react'

interface Props {}

export const ShoppingLists: React.FC<Props> = () => {
  const history = useHistory();

  return <div>
    {Language.shoppingLists()}
    <Button size="lg" colorScheme="blue" onClick={() => history.push("shopping-list/new-shopping-list")}>
      Button
    </Button>
  </div>;

};
