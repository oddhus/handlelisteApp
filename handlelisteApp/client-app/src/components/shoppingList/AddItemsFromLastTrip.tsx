import {
    VStack,
    Text,
    ButtonGroup,
    Button,
    Center,
    Grid,
    GridItem,
    Box,
    Checkbox,
} from '@chakra-ui/react'
import {observer} from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import {useStore} from "../../stores/store";
import {Iitem, IShoppingList} from "../../models/ShoppingList";
import {runInAction} from "mobx";


interface Props {
}

interface CheckedItems {
    isChecked: boolean
    item: Iitem
}

export const AddItemsFromLastTrip: React.FC<Props> = observer(() => {

    const {
        shoppingListStore,
        modalStore,
        settingStore
    } = useStore()

    const [lastShopingList, setLastShoppinglist] = useState<IShoppingList>()
    const [items, setItems] = useState<CheckedItems[]>([])

    useEffect(() => {
        setLastShoppinglist(shoppingListStore.shoppingLists[shoppingListStore.shoppingLists.length - 1])
        const notBought = lastShopingList?.items.filter(item => item.hasBeenBought === false)
        notBought && notBought.forEach((item) => {
            setItems(items => [...items, {isChecked: false, item: item}] )
        })
    }, [lastShopingList])
    
    const addItemsToShoppingList = () => {
        items && items.forEach((item: CheckedItems) => {
            if(item.isChecked){
                shoppingListStore.addItem(item.item)
            }
        })
        runInAction(() =>{
            modalStore.closeModal()
            shoppingListStore.saveShoppinglist()
        })
    }

    const onChecked = (item: CheckedItems) => {
        setItems(
            items.map((checkedItem) => {
                if (checkedItem.item.itemName === item.item.itemName) {
                    checkedItem.isChecked = !checkedItem.isChecked
                }
                return checkedItem
            })
        )
    }

    return (
        <VStack alignItems="flex-start" p={0}>
            <Text fontWeight="600"
                  fontSize="xl">
                {settingStore.language.addItemsFromLastTrip}</Text>
            {items && items.map((item:CheckedItems, i:number) => {
                return (
                    <Grid key={item.item.itemIdentifier}
                          templateColumns="repeat(18, 1fr)"
                          gap={1}
                          color={item.item.hasBeenBought ? 'rgba(0,0,0,0.3)' : ''}
                    >
                        <GridItem
                            colSpan={2}
                            alignItems="center"
                        >
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                minW="100%"
                                minH="100%"
                            >
                                <Checkbox
                                    isChecked={item.isChecked}
                                    colorScheme="green"
                                    size="lg"
                                    onChange={() => onChecked(item)}
                                />
                            </Box>
                        </GridItem>

                        <GridItem colSpan={[8, 8, 11]}>
                            <Box
                                display="flex"
                                alignItems="center"
                                minW="100%"
                                minH="100%"
                            >
                                <Text>{item.item.itemName}</Text>
                            </Box>
                        </GridItem>
                    </Grid>
                )
            })}
            <ButtonGroup style={{marginBottom: '20px'}} spacing="4" size="md">
                <Center>
                    <Button
                        colorScheme='red'
                        onClick={() => {
                            modalStore.closeModal()
                        }}
                    >{settingStore.language.noThanks}</Button>
                    <Button
                        colorScheme='green'
                        onClick={() => addItemsToShoppingList()}
                    >{settingStore.language.add}</Button>
                </Center>
            </ButtonGroup>
        </VStack>
    )
})
