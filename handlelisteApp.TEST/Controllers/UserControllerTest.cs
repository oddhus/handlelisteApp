using handlelisteApp.Context;
using handlelisteApp.Controllers;
using handlelisteApp.Services;
using Moq;
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
        private Mock<IUserService> _mockService;
        private Mock<ShoppingListContext> _mockContext;
        private UserController _controller;

        [Fact]
        public void ControllerShouldCallServiceWhenCreatingNewUser()
        {

        }

    }
}
