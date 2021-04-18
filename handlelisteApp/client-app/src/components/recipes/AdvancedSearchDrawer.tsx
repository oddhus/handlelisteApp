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
        pageSize: undefined,
        searchText: query.searchText || '',
      })
    }
  }, [query])

  const onAddIngredient = () => {
    currentQuery.items = [...currentQuery.items, ingredientToAdd]
    setIngredientToAdd('')
  }

  const onReset = () => {
    setQuery(initialQuery)
  }

  const onSearch = () => {
    setQuery(currentQuery)
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
                  <FormLabel htmlFor="username">SearchText</FormLabel>
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
                  <FormLabel htmlFor="ingredient">Include ingredient</FormLabel>
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
              </VStack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button mr={3} onClick={() => onReset()}>
                Reset
              </Button>
              <Button colorScheme="blue" onClick={() => onSearch()}>
                Search
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
