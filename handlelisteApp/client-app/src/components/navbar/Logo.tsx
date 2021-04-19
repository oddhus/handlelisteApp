import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'

export const Logo = (props: any) => {
  return (
    <Box {...props} style={{color: 'white'}}>
      <Link
        as={RouterLink}
        to="/shopping-list"
        style={{ textDecoration: 'none' }}
      >
          <FontAwesomeIcon icon={faArchive}/>
          {` Shipping list`}
      </Link>
    </Box>
  )
}
