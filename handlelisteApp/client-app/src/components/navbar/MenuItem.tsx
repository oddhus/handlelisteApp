import React from 'react'
import { Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
  isLast?: boolean
  to: string
  setIsOpen: Function
}

export const MenuItem: React.FC<Props> = ({
  children,
  isLast,
  to = '/',
  setIsOpen,
  ...rest
}) => {
  return (
    <Link as={RouterLink} to={to} onClick={() => setIsOpen(false)}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  )
}
