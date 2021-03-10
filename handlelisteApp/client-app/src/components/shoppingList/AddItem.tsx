import React, { ChangeEvent, useState } from 'react';
import { Iitem } from '../../models/ShoppingList';
import { activeLanguage } from '../../lang/ActiveLanguage';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  Select,
  Container,
} from '@chakra-ui/react';

interface Props {
  onAdd(arg: Iitem): void;
}

export const AddItem: React.FC<Props> = ({ onAdd }) => {
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');

  const onAddClicked = () => {
    const item: Iitem = {
      category: category.toLowerCase(),
      product: product.toLowerCase(),
      quantity: quantity,
      unit: unit,
    }
    onAdd(item)
  }

  return (
    <Container
    mb={5}
    border="1px"
    borderRadius="lg"
    p={4}
    borderColor="#A0AEC0"
    >
      <FormControl id='category'>
        <FormLabel>{activeLanguage.category}</FormLabel>
        <Input onChange={(e) => setCategory(e.target.value)} />
      </FormControl>
      <FormControl id='product'>
        <FormLabel>{activeLanguage.product}</FormLabel>
        <Input onChange={(e) => setProduct(e.target.value)} />
      </FormControl>
      <FormControl id='amount'>
        <FormLabel>{activeLanguage.shoppingList[1]}</FormLabel>
        <NumberInput
          onChange={(valueString) => setQuantity(parseInt(valueString))}
          max={100}
          min={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <br />
      <FormLabel>{activeLanguage.shoppingList[1]}</FormLabel>
      <Select onChange={(e) => setUnit(e.target.value)}>
        <option value={activeLanguage.units[0]}>{activeLanguage.units[0]}</option>
        <option value={activeLanguage.units[1]}>{activeLanguage.units[1]}</option>
        <option value={activeLanguage.units[2]}>{activeLanguage.units[2]}</option>
        <option value={activeLanguage.units[3]}>{activeLanguage.units[3]}</option>
        <option value={activeLanguage.units[4]}>{activeLanguage.units[4]}</option>
      </Select>
      <br />
      <ButtonGroup>
        <Button onClick={() => console.log('Cancel')} colorScheme={'red'}>
          {activeLanguage.cancel}
        </Button>
        <Button onClick={() => onAddClicked()} colorScheme={'teal'}>
          {activeLanguage.add}
        </Button>
      </ButtonGroup>
    </Container>
  );
};
