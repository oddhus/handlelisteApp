Feature: SpecFlowFeature1
	Simple calculator for adding two numbers

@mytag
Scenario: Create new User
	Given I POST a valid user to the Usercontroller
	When I GET the user
	Then the result should be the user
