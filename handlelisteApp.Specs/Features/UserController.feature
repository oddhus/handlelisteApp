Feature: User Repository
	Repository for getting users from database

@mytag
Scenario: Create new User
	Given I POST a valid user to the Usercontroller
	When I GET the user
	Then the result should be the user
