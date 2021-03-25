import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Recipes } from '../../pages/Recipes'
import English from '../../lang/en'
import { MockLanguage } from '../MockLanguage'

//Mock the store returned from the useStore hook. In this case only null is returned.
jest.mock('../../stores/store', () => ({
  useStore: () => ({
    settingStore: {
      language: { ...MockLanguage },
    },
    recipeStore: {
      allRecipes: [],
      currentRecipeList: [],
      loading: false,
      getUserRecipes: () => undefined,
      getAllRecipes: () => undefined,
      reset: () => undefined,
    },
    userStore: {
      user: {
        id: undefined,
      },
    },
    shoppingListStore: {
      backToMyShoppingList: 4
    }
  }),
}))

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    history: {
      push: jest.fn(),
    },
  }),
}))

describe('RecipesPage', () => {
  describe('Layout', () => {
    it('has header of Recipes', () => {
      const { container } = render(<Recipes />)
      const div = container.querySelector('div')
      expect(div).toHaveTextContent('Create recipe')
    })
  })
})
