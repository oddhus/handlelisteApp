import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Recipe } from '../../pages/Recipe'
import English from '../../lang/en'
import { MockLanguage } from '../MockLanguage'

//Mock the store returned from the useStore hook. In this case only null is returned.
jest.mock('../../stores/store', () => ({
  useStore: () => ({
    settingStore: {
      language: { ...MockLanguage },
    },
    recipeStore: {
      loading: false,
      reset: () => undefined,
      currentRecipe: {
        recipeName: 'Recipe',
        items: [],
      },
      feedBack: {
        text: 'Bra',
        status: 'success',
      },
      resetFeedBack: () => undefined,
    },
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    recipeId: undefined,
    listId: '1',
  }),
  useHistory: () => ({
    history: {
      push: jest.fn(),
    },
  }),
}))

describe('RecipePage', () => {
  describe('Layout', () => {
    it('has header of Recipe', () => {
      const { container } = render(<Recipe />)
      const div = container.querySelector('div')
      expect(div).toHaveTextContent('Recipe')
    })
  })
})
