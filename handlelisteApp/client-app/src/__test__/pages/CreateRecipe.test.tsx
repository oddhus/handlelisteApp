import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { CreateRecipe } from '../../pages/CreateRecipe'
import { MockLanguage } from '../MockLanguage'
import userEvent from '@testing-library/user-event'

//Mock the store returned from the useStore hook. In this case only null is returned.
jest.mock('../../stores/store', () => ({
  useStore: () => ({
    settingStore: {
      language: { ...MockLanguage },
    },
    recipeStore: {
      currentRecipe: null,
      getRecipe: () => null,
      updateRecipe: jest.fn(),
      createRecipe: jest.fn(),
      reset: () => null,
    },
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    recipeId: undefined,
  }),
  useHistory: () => ({
    history: {
      push: jest.fn(),
    },
  }),
}))

describe('CreateRecipePage', () => {
  describe('Layout', () => {
    it('has header of Household', () => {
      const { container } = render(<CreateRecipe />)
      const div = container.querySelector('div')
      expect(div).toHaveTextContent('Create recipe')
    })
  })
})
