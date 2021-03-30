import { Search2Icon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { store } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const RecipeSearch: React.FC<Props> = observer(() => {
  return (
    <div>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.300" />}
        />
        <Input 
        onChange={(e) => store.recipeStore.searchInRecipies(e.target.value.toLowerCase())}
        type="tel" 
        placeholder={store.settingStore.language.search} />
      </InputGroup>
      <RecipeList editable={false} deleteable={false} />
    </div>
  )
})
