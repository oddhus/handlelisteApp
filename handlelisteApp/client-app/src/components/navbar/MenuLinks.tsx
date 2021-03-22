import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  MenuItem as MenuItemChakra,
  Button,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { MenuItem } from './MenuItem'
import { useMediaQuery } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import {
  allUsers,
  signedIn,
  signedOut,
  userSettings,
} from '../../routes/definedRoutes'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'

interface Props {
  isOpen: boolean
  setIsOpen: Function
}

const MenuLinks: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [isLargerThan420] = useMediaQuery('(min-width: 30em)')

  const { userStore, settingStore } = useStore()

  const buttonMenu = (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontWeight="normal"
        colorScheme="teal"
      >
        {settingStore.isEnglish ? 'Account' : 'Konto'}
      </MenuButton>
      <MenuList>
        {userSettings.map((route) => (
          <MenuItemChakra as={Link} to={route.path} key={route.path}>
            {settingStore.isEnglish ? route.nameEn : route.nameNo}
          </MenuItemChakra>
        ))}
        <MenuItemChakra
          onClick={() => {
            setIsOpen(false)
            userStore.logout()
          }}
        >
          {settingStore.isEnglish ? 'Logout' : 'Logg ut'}
        </MenuItemChakra>
      </MenuList>
    </Menu>
  )

  const listMenu = (
    <React.Fragment>
      {[...userSettings].map((route) => (
        <MenuItem key={route.path} to={route.path} setIsOpen={setIsOpen}>
          {settingStore.isEnglish ? route.nameEn : route.nameNo}
        </MenuItem>
      ))}
      <Button
        size="small"
        colorScheme="teal"
        onClick={() => {
          setIsOpen(false)
          userStore.logout()
        }}
        fontWeight="normal"
        _hover={{
          backgroundColor: 'transparent',
          textDecoration: 'underline',
        }}
      >
        {settingStore.isEnglish ? 'Logout' : 'Logg ut'}
      </Button>
    </React.Fragment>
  )

  const signedOutList = (
    <React.Fragment>
      {signedOut.map((route) => (
        <MenuItem
          key={route.path}
          to={route.path}
          isLast={route.isLast}
          setIsOpen={setIsOpen}
        >
          {settingStore.isEnglish ? route.nameEn : route.nameNo}
        </MenuItem>
      ))}
    </React.Fragment>
  )

  const mainItems = !userStore.isLoggedIn ? allUsers : signedIn

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', sm: 'block' }}
      flexBasis={{ base: '100%', sm: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'flex-end', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 0, 0, 0]}
      >
        {mainItems.map((route) => (
          <MenuItem key={route.path} to={route.path} setIsOpen={setIsOpen}>
            {settingStore.isEnglish ? route.nameEn : route.nameNo}
          </MenuItem>
        ))}
        {!userStore.isLoggedIn
          ? signedOutList
          : isLargerThan420
          ? buttonMenu
          : listMenu}
      </Stack>
    </Box>
  )
}

export default observer(MenuLinks)
