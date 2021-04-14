import { Search2Icon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const RecipeSearch: React.FC<Props> = observer(() => {
  const { settingStore, recipeStore } = useStore()
  return (
    <div>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.300" />}
        />
        <Input
          onChange={(e) =>
            recipeStore.searchInRecipies(e.target.value.toLowerCase())
          }
          type="tel"
          placeholder={settingStore.language.search}
        />
        {/*
        <Box mt={'1vh'} ml={'0.5vw'}>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              size="xs"
              variant="outline"
            />
            <MenuList>
              <MenuOptionGroup title="Filter by" type="checkbox">
                <MenuItemOption value="email">Name</MenuItemOption>
                <MenuItemOption value="phone">Ingredient</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Box>
                */}
      </InputGroup>
      <RecipeList />
    </div>
  )
})
