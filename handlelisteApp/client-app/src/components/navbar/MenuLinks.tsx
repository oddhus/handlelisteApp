import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  MenuItem as MenuItemChakra,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MenuItem } from "./MenuItem";
import { useMediaQuery } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { allUsers, signedIn, signedOut } from "../../routes/definedRoutes";

interface Props {
  isOpen: boolean;
}

export const MenuLinks: React.FC<Props> = ({ isOpen }) => {
  const [isLargerThan420] = useMediaQuery("(min-width: 30em)");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const buttonMenu = (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontWeight="normal"
        colorScheme="teal"
      >
        Profile
      </MenuButton>
      <MenuList>
        {signedIn.map((route) => (
          <MenuItemChakra as={Link} to={route.path} key={route.path}>
            {route.name}
          </MenuItemChakra>
        ))}
        <MenuItemChakra onClick={() => console.log("logout")}>
          Logout
        </MenuItemChakra>
      </MenuList>
    </Menu>
  );

  const listMenu = (
    <React.Fragment>
      {signedIn.map((route) => (
        <MenuItem key={route.path} to={route.path}>
          {route.name}
        </MenuItem>
      ))}
      <Button
        size="small"
        colorScheme="teal"
        onClick={() => console.log("logout")}
        fontWeight="normal"
        _hover={{ backgroundColor: "transparent", textDecoration: "underline" }}
      >
        Logout
      </Button>
    </React.Fragment>
  );

  const signedOutList = (
    <React.Fragment>
      {signedOut.map((route) => (
        <MenuItem key={route.path} to={route.path} isLast={route.isLast}>
          {route.name}
        </MenuItem>
      ))}
    </React.Fragment>
  );

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", sm: "block" }}
      flexBasis={{ base: "100%", sm: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "flex-end", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 0, 0, 0]}
      >
        {allUsers.map((route) => (
          <MenuItem key={route.path} to={route.path}>
            {route.name}
          </MenuItem>
        ))}
        {!isLoggedIn ? signedOutList : isLargerThan420 ? buttonMenu : listMenu}
      </Stack>
    </Box>
  );
};
