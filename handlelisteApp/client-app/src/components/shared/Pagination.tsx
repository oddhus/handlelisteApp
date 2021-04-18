import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { NumberParam, useQueryParam } from 'use-query-params'
import { IPaginatedRecipes } from '../../models/recipe'

interface Props {
  paginatedRecipe: IPaginatedRecipes | undefined
}

export const Pagination: React.FC<Props> = ({ paginatedRecipe }) => {
  const [pageNumber, setPageNumber] = useQueryParam('pageNumber', NumberParam)

  return (
    <>
      {paginatedRecipe && (
        <HStack>
          <Button
            disabled={!paginatedRecipe.hasPrevious}
            onClick={() => {
              if (paginatedRecipe.currentPage) {
                setPageNumber(paginatedRecipe.currentPage - 1)
              }
            }}
          >
            Previous
          </Button>

          {[
            ...Array.from(
              { length: paginatedRecipe.totalPages },
              (_, i) => i + 1
            ),
          ].map((num) => (
            <Button
              disabled={paginatedRecipe?.currentPage === num}
              key={num}
              onClick={() => setPageNumber(num)}
              colorScheme={
                paginatedRecipe.currentPage === num ? 'brand' : undefined
              }
              variant={
                paginatedRecipe.currentPage === num ? 'solid' : undefined
              }
            >
              {num}
            </Button>
          ))}

          <Button
            disabled={!paginatedRecipe.hasNext}
            onClick={() => {
              if (paginatedRecipe.currentPage) {
                setPageNumber(paginatedRecipe.currentPage + 1)
              }
            }}
          >
            Next
          </Button>
        </HStack>
      )}
    </>
  )
}
