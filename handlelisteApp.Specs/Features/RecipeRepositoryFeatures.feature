Feature: Recipe repository
	Repository for getting recipes from database

@mytag
Scenario: Finding Recipes using a given item
	Given I provide an item to the RecipeRepository
	When I get a result from the repository
	Then the result should contain only recipes using that item
	And the result should not contain recipes not using that item



Scenario: Adding a recipe
	Given I provide a recipe id to the RecipeRepository
	Then the recipe should be saved

Scenario: Finding recipes using any item in my Kitchen
	Given I provide a kitchen to the RecipeRepository
	Then the suggested recipes should contain only recipes using those items
	And the suggested recipes should not contain recipes using items not in my kitchen
	

