import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Logo = (props: any) => {
  return (
    <Box {...props}>
      <Link as={RouterLink} to="/" style={{ textDecoration: "none" }}>
        <Text fontSize="lg" fontWeight="bold">
          ShoppingList
        </Text>
      </Link>
    </Box>
  );
};
