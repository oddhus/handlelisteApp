using handlelisteApp.Context;
using handlelisteApp.Controllers;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using handlelisteApp.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Scrypt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace handlelisteApp.Test.Controllers
{
    public class UserControllerTest
    {
        private Mock<IUserService> _mockUserService;
        
        private UserController _controller;

        private User newUser;
        private UserDTO newUserDTO;

        [Fact]
        public void ControllerShouldCallServiceWhenCreatingNewUser()
        {

            UserController controller = setupController();
            Mock<User> mockUser = new Mock<User>();

            controller.CreateUser(mockUser.Object);

            _mockUserService.Verify(s => s.CreateNewUser(It.IsAny<User>()), Times.Once());
        }

        [Fact]
        public void ControllerShouldReturnUserDTOWhenUsingCreateUser()
        {
            User newUser = new User() { Username = "TestUser", HashedPassword = "abc", UserAge = 1 };
            UserDTO newUserDTO = new UserDTO() { Username = "TestUser", UserAge = 1 };

            _mockUserService = new Mock<IUserService>();
            _mockUserService.Setup(s => s.CreateNewUser(newUser)).Returns(newUserDTO);

            UserController controller = new UserController(_mockUserService.Object);
            var returnedActionResult = controller.CreateUser(newUser);

            Assert.Equal(newUserDTO, returnedActionResult.Value);


        }

        [Fact]
        public void ControllerShouldReturnLoginResponseAfterSuccesfulLogin()
        {
            ScryptEncoder scryptEncoder = new ScryptEncoder();
            //User user = new User { Username = "TestUser", HashedPassword = scryptEncoder.Encode("abcd")};
            LoginRequest request = new LoginRequest() { Username = "TestUser", Password = "abcd" };
            LoginResponse response = new LoginResponse() { Username = "TestUser" };

            _mockUserService = new Mock<IUserService>();
            _mockUserService.Setup(service => service.LoginUser(request)).Returns(response);

            _controller = new UserController(_mockUserService.Object);

            var returnedActionResult = _controller.LoginPost(request);

            Assert.Equal(request.Username, returnedActionResult.Value.Username);

        }

        [Fact]
        public void ControllerShouldReturnBadRequestWhenRequestIsMissingData()
        {
            LoginRequest requestMissingUsername = new LoginRequest() { Password = "abcd" };
            LoginRequest requestMissingPassword = new LoginRequest() { Username = "TestUser" };

            _mockUserService = new Mock<IUserService>();

            _controller = new UserController(_mockUserService.Object);

            var returnedActionResultFromMissingUsername = _controller.LoginPost(requestMissingUsername);
            var returnedActionResultFromMissingPassword = _controller.LoginPost(requestMissingPassword);

            Assert.IsType<BadRequestObjectResult>(returnedActionResultFromMissingUsername.Result);
            Assert.IsType<BadRequestObjectResult>(returnedActionResultFromMissingPassword.Result);


        }


        private UserController setupController()
        {
            User newUser = new User() { Username = "TestUser", HashedPassword = "abc", UserAge = 1 };
            UserDTO newUserDTO = new UserDTO() { Username = "TestUser", UserAge = 1 };

            _mockUserService = new Mock<IUserService>();
            _mockUserService.Setup(s => s.CreateNewUser(newUser)).Returns(newUserDTO);

            return new UserController(_mockUserService.Object);
        }



    }
}
