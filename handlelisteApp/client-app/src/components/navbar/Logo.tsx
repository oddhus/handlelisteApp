import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export const Logo = (props: any) => {
  return (
    <Box {...props}>
      <Link
        as={RouterLink}
        to="/shopping-list"
        style={{ textDecoration: 'none' }}
      >
        <Text fontSize="md" fontWeight="bold" color="white">
          ShoppingList
        </Text>
      </Link>
    </Box>
  )
}
