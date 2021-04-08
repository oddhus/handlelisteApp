import { useToast, Wrap } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

interface Props {
  store: any
}

export const Toast: React.FC<Props> = observer(({ store }) => {
  const toast = useToast()
  useEffect(() => {
    if (store.feedBack) {
      toast({
        title: store.feedBack.text,
        status: store.feedBack.status,
        isClosable: true,
        position: 'bottom',
        duration: 4000,
        onCloseComplete: () => store.resetFeedBack(),
      })
      store.resetFeedBack()
    }
  }, [store.feedBack])
  return <Wrap hidden={true}></Wrap>
})
