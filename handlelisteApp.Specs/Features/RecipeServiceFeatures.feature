Feature: RecipeService
	Service for finding recipes in the API

@mytag
Scenario: Finding recipes using a given item
	Given I provide an item to the ServiceController
	When I get a result
	Then the result should contain recipes using that item and only those recipes

Scenario: Finding recipes based on shopping lists
	Given I have updated a shopping list in the last three weeks
	When I ask for suggestions
	Then the result should contain recipes using items on those shopping lists
	And the result should not contain recipes using items not on those shopping lists

Scenario: Service retrieve recipes related to one user using userId
	Given that userId is <number>
	When I get a result from GetRecipeByUserID
	Then the result should contain recipes with <number>

	Examples:
		| number |
		| 1      |