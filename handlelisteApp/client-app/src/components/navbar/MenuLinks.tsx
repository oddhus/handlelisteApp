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
}

const MenuLinks: React.FC<Props> = ({ isOpen }) => {
  const [isLargerThan420] = useMediaQuery('(min-width: 30em)')

  const { userStore } = useStore()

  const buttonMenu = (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontWeight="normal"
        colorScheme="teal"
      >
        Account
      </MenuButton>
      <MenuList>
        {userSettings.map((route) => (
          <MenuItemChakra as={Link} to={route.path} key={route.path}>
            {route.name}
          </MenuItemChakra>
        ))}
        <MenuItemChakra onClick={() => userStore.logout()}>
          Logout
        </MenuItemChakra>
      </MenuList>
    </Menu>
  )

  const listMenu = (
    <React.Fragment>
      {[...userSettings].map((route) => (
        <MenuItem key={route.path} to={route.path}>
          {route.name}
        </MenuItem>
      ))}
      <Button
        size="small"
        colorScheme="teal"
        onClick={() => userStore.logout()}
        fontWeight="normal"
        _hover={{
          backgroundColor: 'transparent',
          textDecoration: 'underline',
        }}
      >
        Logout
      </Button>
    </React.Fragment>
  )

  const signedOutList = (
    <React.Fragment>
      {signedOut.map((route) => (
        <MenuItem key={route.path} to={route.path} isLast={route.isLast}>
          {route.name}
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
          <MenuItem key={route.path} to={route.path}>
            {route.name}
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
