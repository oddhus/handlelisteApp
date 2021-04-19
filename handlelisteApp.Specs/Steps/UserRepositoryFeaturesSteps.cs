using handlelisteApp.Context;
using handlelisteApp.Data;
using handlelisteApp.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using TechTalk.SpecFlow;

namespace handlelisteApp.Specs.Steps
{

   




    [Binding]
    public class UserRepositoryFeaturesSteps
    {

        private UserRepository userRepository;
        
        private Mock<DbSet<User>> _mockUserSet;
        private Mock<ShoppingListContext> _mockContext;

        private User testUser;

        public UserRepositoryFeaturesSteps(ScenarioContext scenarioContext)
        {

            var userData = new List<User> {  };

            _mockUserSet = new Mock<DbSet<User>>();
            _mockUserSet.As<IQueryable<User>>().Setup(m => m.Provider).Returns(userData.AsQueryable().Provider);
            _mockUserSet.As<IQueryable<User>>().Setup(m => m.Expression).Returns(userData.AsQueryable().Expression);
            _mockUserSet.As<IQueryable<User>>().Setup(m => m.ElementType).Returns(userData.AsQueryable().ElementType);
            _mockUserSet.As<IQueryable<User>>().Setup(m => m.GetEnumerator()).Returns(userData.AsQueryable().GetEnumerator);
            _mockUserSet.Setup(m => m.Add(It.IsAny<User>())).Callback<User>(userData.Add);


            _mockContext = new Mock<ShoppingListContext>();
            _mockContext.Setup(m => m.Users).Returns(_mockUserSet.Object);

            userRepository = new UserRepository(_mockContext.Object);


        }


        [Given(@"I want to create a new user")]
        public void GivenIWantToCreateANewUser()
        {

            testUser = new User { Username = "Test" };
            

        }
        
        [When(@"I add the user to the database")]
        public void WhenIAddTheUserToTheDatabase()
        {
            userRepository.CreateNewUser(testUser);
        }

        [Then(@"the user should be added to the database")]
        public void ThenTheUserShouldBeAddedToTheDatabase()
        {
            _mockContext.Verify(m => m.Add(It.IsAny<User>()), Times.Once);
        }


        [Then(@"the user should be saved in the database")]
        public void ThenTheUserShouldBeSavedInTheDatabase()
        {
            _mockContext.Verify(m => m.SaveChanges(), Times.Once);




        }
    }
}
