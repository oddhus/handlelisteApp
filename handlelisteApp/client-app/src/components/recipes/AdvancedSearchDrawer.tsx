import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  HStack,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'
import { IQueryParams } from '../../models/recipe'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const initialQuery = {
  items: [],
  pageSize: undefined,
  searchText: '',
}

const options = [2, 10, 20, 50]

export const AdvancedSearchDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentQuery, setCurrentQuery] = useState<IQueryParams>(initialQuery)
  const [ingredientToAdd, setIngredientToAdd] = useState('')

  const [query, setQuery] = useQueryParams({
    searchText: StringParam,
    pageNumber: NumberParam,
    pageSize: NumberParam,
    items: withDefault(ArrayParam, []),
  })

  useEffect(() => {
    if (query) {
      setCurrentQuery({
        items: query.items || [],
        pageSize: query.pageSize || undefined,
        searchText: query.searchText || '',
      })
    }
  }, [query])

  const onAddIngredient = () => {
    currentQuery.items = [...currentQuery.items, ingredientToAdd]
    setIngredientToAdd('')
  }

  const onReset = () => {
    setQuery({ ...initialQuery, pageNumber: 1 })
  }

  const onSearch = () => {
    setQuery({ ...currentQuery, pageNumber: 1 })
    onClose()
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Advanced search</DrawerHeader>

            <DrawerBody>
              <VStack minW="100%" spacing={4}>
                <Box minW="100%">
                  <FormLabel htmlFor="SearchText">Search Text</FormLabel>
                  <Input
                    placeholder="Search"
                    value={currentQuery!.searchText}
                    onChange={(e) =>
                      setCurrentQuery({
                        ...currentQuery,
                        searchText: e.target.value,
                      })
                    }
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="IncludeIngredient">
                    Include ingredient
                  </FormLabel>
                  <HStack spacing={2}>
                    <Input
                      value={ingredientToAdd}
                      onChange={(e) => setIngredientToAdd(e.target.value)}
                      placeholder="Ingredient"
                    />
                    <Button
                      disabled={!ingredientToAdd}
                      onClick={() => {
                        onAddIngredient()
                      }}
                    >
                      Add
                    </Button>
                  </HStack>
                </Box>
                <Flex>
                  {currentQuery.items &&
                    currentQuery.items.length > 0 &&
                    (currentQuery.items as string[]).map(
                      (item: string, i: number) => (
                        <Box key={i} pr={2}>
                          <Tag
                            size="lg"
                            borderRadius="full"
                            variant="solid"
                            colorScheme="brand"
                          >
                            <TagLabel>{item}</TagLabel>
                            <TagCloseButton
                              onClick={() =>
                                setCurrentQuery({
                                  ...currentQuery,
                                  items: currentQuery.items.filter(
                                    (_, ii) => ii !== i
                                  ),
                                })
                              }
                            />
                          </Tag>
                        </Box>
                      )
                    )}
                </Flex>

                <Box minW="100%">
                  <FormLabel htmlFor="ingredient">Results Per Page</FormLabel>
                  <Select
                    placeholder={
                      currentQuery.pageSize ? `${currentQuery.pageSize}` : '50'
                    }
                    onChange={(e) =>
                      setCurrentQuery({
                        ...currentQuery,
                        pageSize: parseInt(e.target.value),
                      })
                    }
                  >
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                </Box>
              </VStack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button mr={3} onClick={() => onReset()}>
                Reset
              </Button>
              <Button colorScheme="brand" onClick={() => onSearch()}>
                Search
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
