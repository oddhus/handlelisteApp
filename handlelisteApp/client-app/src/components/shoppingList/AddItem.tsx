import React, { ChangeEvent, useState } from 'react'
import { Iitem } from '../../models/ShoppingList'
import { Button, ButtonGroup } from '@chakra-ui/react'
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
} from '@chakra-ui/react'
import { useStore } from '../../stores/store'

interface Props {
  onAdd(arg: Iitem): void
}

export const AddItem: React.FC<Props> = ({ onAdd }) => {
  const { settingStore } = useStore()
  const [category, setCategory] = useState('')
  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState(settingStore.language.units[0])

  const onAddClicked = () => {
    const item: Iitem = {
      category: category.toLowerCase(),
      product: product.toLowerCase(),
      quantity: quantity,
      unit: unit,
      hasBeenBought: false
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
      <FormControl id="category">
        <FormLabel>{settingStore.language.category}</FormLabel>
        <Input onChange={(e) => setCategory(e.target.value)} />
      </FormControl>
      <FormControl id="product">
        <FormLabel>{settingStore.language.product}</FormLabel>
        <Input onChange={(e) => setProduct(e.target.value)} />
      </FormControl>
      <FormControl id="amount">
        <FormLabel>{settingStore.language.shoppingList[1]}</FormLabel>
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
      <FormLabel>{settingStore.language.shoppingList[1]}</FormLabel>
      <Select onChange={(e) => setUnit(e.target.value)}>
        <option value={settingStore.language.units[0]}>
          {settingStore.language.units[0]}
        </option>
        <option value={settingStore.language.units[1]}>
          {settingStore.language.units[1]}
        </option>
        <option value={settingStore.language.units[2]}>
          {settingStore.language.units[2]}
        </option>
        <option value={settingStore.language.units[3]}>
          {settingStore.language.units[3]}
        </option>
        <option value={settingStore.language.units[4]}>
          {settingStore.language.units[4]}
        </option>
      </Select>
      <br />
      <ButtonGroup>
        <Button onClick={() => console.log('Cancel')} colorScheme={'red'}>
          {settingStore.language.cancel}
        </Button>
        <Button onClick={() => onAddClicked()} colorScheme={'teal'}>
          {settingStore.language.add}
        </Button>
      </ButtonGroup>
    </Container>
  )
}
