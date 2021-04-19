Feature: UserRepositoryFeatures
	User repository

@mytag
Scenario: Creating a new user
	Given I want to create a new user
	When I add the user to the database
	Then the user should be added to the database
	And the user should be saved in the database