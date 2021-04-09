using FluentAssertions;
using handlelisteApp.Controllers;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using handlelisteApp.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechTalk.SpecFlow;

namespace handlelisteApp.Specs.Steps
{
    [Binding]
    public sealed class UserControllerStepDefinitions
    {
        // For additional details on SpecFlow step definitions see https://go.specflow.org/doc-stepdef
        private readonly ScenarioContext _scenarioContext;
        private Mock<IUserService> _mockUserService;
        private UserDTO newUserDTO;
        private UserRegisterDTO user;
        UserController _userController;

        public UserControllerStepDefinitions(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;
        }

        [Given(@"I POST a valid user to the Usercontroller")]
        public void GivenIPOSTAValidUserToTheUsercontroller()
        {
            user = new UserRegisterDTO { Username = "TestUser", UserAge = 1, EmailAddress = "test@test.com" };

            _mockUserService = new Mock<IUserService>();
            newUserDTO = new UserDTO { Username = user.Username, UserAge = user.UserAge };
            _mockUserService.Setup(s => s.CreateNewUser(user)).Returns(new LoginResponse { Username = user.Username });
            _mockUserService.Setup(s => s.GetUser(It.IsAny<int>())).Returns(newUserDTO);

            _userController = new UserController(_mockUserService.Object);

            var result = _userController.CreateUser(user);
            _scenarioContext.Add("createResult", result.Value);
        }

        [When(@"I GET the user")]
        public void WhenIGETTheUser()
        {
            var getResult = _userController.GetUser(1);
            _scenarioContext.Add("getResult", getResult.Value);
        }

        [Then(@"the result should be the user")]
        public void ThenTheResultShouldBeTheUser()
        {
            var actual = _scenarioContext.Get<UserDTO>("getResult");
            var postResult = _scenarioContext.Get<LoginResponse>("createResult");
            actual.Username.Should().BeSameAs(postResult.Username);
        }
    }
}
