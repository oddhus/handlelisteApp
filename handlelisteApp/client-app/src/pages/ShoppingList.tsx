import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  ButtonGroup,
  Button,
  Container,
  VStack,
  Center,
  useEditableControls,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  HStack,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from '@chakra-ui/react'

import { AddItem } from '../components/shoppingList/AddItem'
import { useStore } from '../stores/store'
import { Toast } from '../components/shared/Toast'
import { ShoppingList } from '../components/shoppingList/ShoppingList'
import {
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  EditIcon,
} from '@chakra-ui/icons'
import { AddItemsFromLastTrip } from '../components/shoppingList/AddItemsFromLastTrip'

interface Props {}

interface useParam {
  listId: string | undefined
}

export const ShoppingListPage: React.FC<Props> = observer(() => {
  const history = useHistory()
  const paramObj: useParam = useParams()
  const { shoppingListStore, settingStore, modalStore } = useStore()
  const [shoppingListName, setShoppingListName] = useState(
    shoppingListStore.shoppingList.name
  )
  const [isLargerThan450] = useMediaQuery('(min-width: 450px)')

  useEffect(() => {
    shoppingListStore.resetBackToShoppingList()
  }, [])

  useEffect(() => {
    if (paramObj?.listId) {
      const listId = parseInt(paramObj.listId)
      if (shoppingListStore.shoppingList.shoppingListID !== listId) {
        shoppingListStore.getShoppinglist(listId).then(() => {
          setShoppingListName(shoppingListStore.shoppingList.name)
        })
      }
    }
  }, [paramObj])

  const handleSaveName = (name: string) => {
    setShoppingListName(name)
    shoppingListStore.shoppingList.name = name
    shoppingListStore.saveShoppinglist()
  }

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="md" mt={'1vh'}>
        <IconButton
          icon={<CheckIcon />}
          aria-label={settingStore.language.saveListName}
          {...getSubmitButtonProps()}
        />

        <IconButton
          icon={<CloseIcon />}
          aria-label={settingStore.language.cancel}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <ButtonGroup size="md" ml="1vw">
        <IconButton
          size="md"
          icon={<EditIcon />}
          aria-label={settingStore.language.editListName}
          {...getEditButtonProps()}
        />
      </ButtonGroup>
    )
  }

  const sendToRecipes = () => {
    shoppingListStore.backToMyShoppingList = shoppingListStore.shoppingList.shoppingListID.toString()
    history.push('/recipes')
  }

  return (
    <Container maxW="container.sm">
      <VStack spacing={6}>
        {shoppingListName !== '' && (
          <Editable
            fontWeight="bold"
            textAlign="center"
            defaultValue={shoppingListName}
            fontSize={isLargerThan450 ? '2xl' : 'lg'}
            mt="1vh"
            isPreviewFocusable={true}
            submitOnBlur={true}
            onSubmit={(name) => handleSaveName(name)}
            minW="100%"
            maxW="100%"
          >
            <HStack minW="100%" justify="center" spacing={4}>
              <EditablePreview maxWidth="100%" isTruncated />
              <EditableInput />
              <EditableControls />
            </HStack>
          </Editable>
        )}

        <ButtonGroup isAttached>
          <AddItem />
          <Menu>
            <MenuButton
              backgroundColor="#539495"
              _hover={{ backgroundColor: 'teal.600' }}
              _active={{ backgroundColor: 'teal.800' }}
              border="1px"
              borderColor="teal.500"
              as={IconButton}
              icon={<ChevronDownIcon size="300px" color="white" />}
            ></MenuButton>
            <MenuList>
              <MenuItem onClick={() => sendToRecipes()}>
                {settingStore.language.addItemsFromRecipe}
              </MenuItem>
              {shoppingListStore.shoppingLists.length > 1 &&
                shoppingListStore.shoppingLists[1].items.length > 0 && (
                  <MenuItem
                    onClick={() =>
                      modalStore.openModal(<AddItemsFromLastTrip />)
                    }
                  >
                    {settingStore.language.addItemsFromLastTrip2}
                  </MenuItem>
                )}
            </MenuList>
          </Menu>
        </ButtonGroup>
        {shoppingListStore.isLoading ? <Spinner /> : <ShoppingList />}
      </VStack>

      {shoppingListStore.shoppingList.items.length !== 0 && (
        <Center className="itemList">
          <Button
            mt={16}
            variant="outline"
            //does nothing for the time being
            onClick={() => history.push('/shopping-list')}
          >
            {settingStore.language.archiveShoppingList}
          </Button>
        </Center>
      )}
      <Toast store={shoppingListStore} />
    </Container>
  )
})
