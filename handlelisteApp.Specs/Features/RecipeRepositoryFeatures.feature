Feature: Recipe repository
	Repository for getting recipes from database

@mytag
Scenario: Finding Recipes using a given item
	Given I provide an item to the RecipeRepository
	When I get a result from the repository
	Then the result should contain only recipes using that item


Scenario: Adding a recipe
	Given I provide a recipe id to the RecipeRepository
	Then the recipe should be saved