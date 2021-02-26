import React from "react";
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import {AppRoutes} from "../../routes/AppRoutes";

const setup = (path:string) => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <AppRoutes/>
        </MemoryRouter>
    )
}

const routeComponentPropsMock = {
    history: {} as any,
    location: {} as any,
    match: {} as any,
}

describe('AppRoutes', () =>{
    describe('Layout', () =>{

        it('displays homepage when url is /', () => {
          const {queryByTestId} = setup('/')
            expect(queryByTestId('homepage')).toBeInTheDocument()
        })
        
        it('displays SignInPage when url is /signin', () =>{
            const {getByTestId} = setup('/signin')
            expect(getByTestId('login-container')).toBeInTheDocument()

        })

        it('displays SignUp when url is /signup', () =>{
            const {container} = setup('/signup')
            const header = container.querySelector('div')
            expect(header).toHaveTextContent('SignUp')
        })
        it('displays createRecipePage when url is /create-recipe', () =>{
            const {container} = setup('/create-recipe')
            const header = container.querySelector('div')
            expect(header).toHaveTextContent('CreateRecipe')
        })

        it('displays recipesPage when url is /recipes', () =>{
            const {container} = setup('/recipes')
            const header = container.querySelector('div')
            expect(header).toHaveTextContent('Recipes')
        })

        it('displays RecipePage when url is /recipes/:recipeId', () =>{
            const {container} = setup('/recipes/:recipeId')
            const header = container.querySelector('div')
            expect(header).toHaveTextContent('Recipe')
        })

        it('displays ShoppingLists when url is shopping-list', () =>{
            const {container} = setup('/shopping-list')
            const header = container.querySelector('div')
            expect(header).toHaveTextContent('ShoppingLists')
        })

        it('displays ShoppingList when url is /shopping-list/:listId', () =>{
            const {container} = setup('/shopping-list/:listId')
            const header = container.querySelector('div')
            expect(header).toHaveTextContent('ShoppingList')
        })

        it('displays SettingPage when url is /settings/user', () =>{
            const {container} = setup('/settings/user')
            const header = container.querySelector('div')
            expect(header).toHaveTextContent('Settings')
        })

        it('displays householdPage when url is /household', () =>{
            const {container} = setup('/household')
            const header = container.querySelector('div')
            expect(header).toHaveTextContent('Household')
        })
    })
})