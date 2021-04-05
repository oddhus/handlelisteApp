import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
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
} from '@chakra-ui/react'

import { AddItem } from '../components/shoppingList/AddItem'
import { useStore } from '../stores/store'
import { Toast } from '../components/shared/Toast'
import { ShoppingListItems } from '../components/shoppingList/ShoppingListItems'
import {
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  EditIcon,
} from '@chakra-ui/icons'

interface Props {}

interface useParam {
  listId: string | undefined
}

export const ShoppingList: React.FC<Props> = observer(() => {
  const makingNewList = useLocation().pathname.includes('new-shopping-list')
  const history = useHistory()
  const paramObj: useParam = useParams()
  const { shoppingListStore, settingStore } = useStore()
  const [shoppingListName, setShoppingListName] = useState(
    shoppingListStore.shoppingList.name
  )

  const [isLargerThan450] = useMediaQuery('(min-width: 450px)')

  useEffect(() => {
    shoppingListStore.isNew = makingNewList
    shoppingListStore.resetFeedBack()
  }, [])

  useEffect(() => {
    if (paramObj?.listId) {
      const listId = parseInt(paramObj.listId)
      if (
        !makingNewList &&
        shoppingListStore.shoppingList.shoppingListID !== listId
      ) {
        shoppingListStore.getShoppinglist(listId).then(() => {
          setShoppingListName(shoppingListStore.shoppingList.name)
        })
      }
    }
  }, [makingNewList, paramObj])

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
      <VStack>
        {shoppingListName !== '' && (
          <Editable
            fontWeight="bold"
            textAlign="center"
            defaultValue={shoppingListName}
            fontSize={isLargerThan450 ? '4xl' : '2xl'}
            isPreviewFocusable={true}
            mb="2vh"
            mt="2vh"
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

        <ButtonGroup
          style={{ marginBottom: '20px' }}
          isAttached
          spacing="4"
          size="md"
        >
          <AddItem />
          <Menu>
            <MenuButton
              backgroundColor="green.100"
              _hover={{ backgroundColor: 'green.200' }}
              _active={{ backgroundColor: 'green.300' }}
              border="1px"
              borderColor="green.500"
              as={IconButton}
              icon={<ChevronDownIcon />}
            ></MenuButton>
            <MenuList>
              <MenuItem onClick={() => sendToRecipes()}>
                {settingStore.language.addItemsFromRecipe}
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => sendToRecipes()}
          >
            {settingStore.language.addItemsFromRecipe}
          </Button> */}
        </ButtonGroup>
        <ShoppingListItems />
        {shoppingListStore.feedBack !== null && (
          <Toast
            text={
              shoppingListStore.feedBack.status !== 200
                ? settingStore.language.somethingError
                : settingStore.language.shoppingListSaved
            }
            store={shoppingListStore}
            status={shoppingListStore.feedBack.type}
          />
        )}
      </VStack>
      {shoppingListStore.shoppingList.items.length !== 0 && (
        <Center className="itemList">
          <Button
            style={{ marginTop: '40px' }}
            size="lg"
            colorScheme="teal"
            variant="outline"
            //does nothing for the time being
            onClick={() => history.push('/shopping-list')}
          >
            {settingStore.language.archiveShoppingList}
          </Button>
        </Center>
      )}
    </Container>
  )
})
