import { CloseIcon, Search2Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import React from 'react'
import {
  ArrayParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'
import { useStore } from '../../stores/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faListUl } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react-lite'

interface Props {
  onOpen: Function
}

export const SearchBar: React.FC<Props> = observer(({ onOpen }) => {
  const { recipeStore, settingStore } = useStore()
  const [query, setQuery] = useQueryParams({
    searchText: StringParam,
    items: withDefault(ArrayParam, []),
  })

  const { items, searchText } = query

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({
      ...query,
      searchText:
        e.target.value === '' ? undefined : e.target.value.toLowerCase(),
    })
  }

  return (
    <Grid
      gap={2}
      mt="3vh"
      templateColumns="repeat(12, 1fr)"
      templateRows={['repeat(2, 1fr)', 'repeat(1, 1fr)']}
    >
      <GridItem colSpan={[12, 6, 8]}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input
            value={searchText || ''}
            onChange={(e) => onInput(e)}
            type="tel"
            placeholder={settingStore.language.search}
          />
          {((items && items.length > 0) || searchText) && (
            <InputRightElement width="2.5rem">
              <IconButton
                aria-label="reset"
                h="1.75rem"
                size="sm"
                icon={<CloseIcon />}
                onClick={() =>
                  setQuery({
                    searchText: undefined,
                    items: undefined,
                  })
                }
              />
            </InputRightElement>
          )}
        </InputGroup>
      </GridItem>
      <GridItem colSpan={[5, 4, 2]} rowStart={[2, 1, 1]} colStart={[1, 7, 9]}>
        <Button
          onClick={() => onOpen()}
          colorScheme="brand"
          variant={items && items.length > 0 ? 'solid' : 'outline'}
        >
          Advanced Search
        </Button>
      </GridItem>
      <GridItem colSpan={[2, 1]} rowStart={[2, 1, 1]} colStart={[10, 12]}>
        <Box mt="5px" alignItems="center">
          <FontAwesomeIcon
            data-cy={recipeStore.cardView ? 'list-view' : 'card-view'}
            size="2x"
            icon={recipeStore.cardView ? faListUl : faTh}
            onClick={() => (recipeStore.cardView = !recipeStore.cardView)}
          />
        </Box>
      </GridItem>
    </Grid>
  )
})
