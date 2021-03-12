import { Flex } from '@chakra-ui/react'
import React from 'react'

export const NavBarContainer: React.FC = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={4}
      p={4}
      pr={8}
      pl={8}
      bg={['teal.600', 'transparent', 'transparent', 'transparent']}
      color={['white', 'teal.700', 'teal.700', 'teal.700']}
      borderBottom="1px"
      borderBottomColor="teal.800"
      {...props}
    >
      {children}
    </Flex>
  )
}
