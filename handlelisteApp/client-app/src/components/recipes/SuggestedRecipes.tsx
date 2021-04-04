import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { Heading, HStack, Tooltip, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const SuggestedRecipes: React.FC<Props> = observer(() => {
  const { settingStore } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <VStack>
      <HStack justify="flex-end">
        <Heading as="h4" size="lg">
          {settingStore.language.suggestedRecipes}
        </Heading>
        <Tooltip
          hasArrow
          label={settingStore.language.suggestedRecipesToolTip}
          bg="gray.100"
          color="black"
          isOpen={isOpen}
        >
          <QuestionOutlineIcon
            onMouseOver={() => setIsOpen(true)}
            onClick={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          />
        </Tooltip>
      </HStack>
      <RecipeList editable={false} deleteable={false} />
    </VStack>
  )
})
