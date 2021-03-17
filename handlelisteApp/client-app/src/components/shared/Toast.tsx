import { useToast, Wrap } from '@chakra-ui/react'
import React, { useEffect } from 'react'

interface Props {
  status: 'info' | 'warning' | 'success' | 'error' | undefined
  text: string
  store: any
}

export const Toast: React.FC<Props> = ({ status, text, store }) => {
  const toast = useToast()
  useEffect(() => {
    {
      store.feedBack !== null &&
        toast({
          title: text,
          status: status,
          isClosable: true,
          position: 'bottom',
          onCloseComplete: () => (store.feedBack = null),
        })
    }
  }, [status, text, store, toast])
  return <Wrap hidden={true}></Wrap>
}
