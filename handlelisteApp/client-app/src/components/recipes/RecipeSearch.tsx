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
        onChange={(e) => recipeStore.searchInRecipies(e.target.value.toLowerCase())}
        type="tel" 
        placeholder={settingStore.language.search} />
      </InputGroup>
      <RecipeList editable={false} deleteable={false} />
    </div>
  )
})
