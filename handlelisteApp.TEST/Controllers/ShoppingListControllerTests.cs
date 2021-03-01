using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using handlelisteApp.Context;
using handlelisteApp.Data;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using handlelisteApp.Services;
using handlelisteApp.Controllers;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace handlelisteApp.TEST.Controllers
{

    public class ShoppingListControllerTests
    {
        private Mock<IShoppingListService> _mockService;
        private ShoppingListController _controller;
        private ShoppingListCreateUpdateDTO createDTO;
        private ShoppingListReadDTO readDTO;
        private int userId = 1;

        private int shoppingListId = 12;

        public ShoppingListControllerTests()
        {
            //Create two test objects
            createDTO = new ShoppingListCreateUpdateDTO()
            {
                Items = new List<ItemOnShoppingListCreateDTO>(){
                    new ItemOnShoppingListCreateDTO()
                    {
                        ItemName = "Brus",
                        Quantity = 2,
                    }
                }
            };

            readDTO = new ShoppingListReadDTO()
            {
                ShoppingListID = 1,
                Items = new List<ItemOnShoppingListReadDTO>()
                {
                    new ItemOnShoppingListReadDTO()
                    {
                        ItemName = "Brus",
                        Quantity = 2
                    }
                }
            };

            var returnReadDTO = new ShoppingListReadDTO()
            {
                ShoppingListID = 1,
                Items = new List<ItemOnShoppingListReadDTO>()
                {
                    new ItemOnShoppingListReadDTO()
                    {
                        ItemName = "Brus",
                        Quantity = 2
                    }
                }
            };

            //Mock service
            _mockService = new Mock<IShoppingListService>();
            _mockService.Setup(s => s.CreateShoppingList(It.IsAny<int>(), It.IsAny<ShoppingListCreateUpdateDTO>())).Returns(returnReadDTO);
            _mockService.Setup(s => s.UpdateShoppingList(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<ShoppingListCreateUpdateDTO>())).Returns(returnReadDTO);
            _mockService.Setup(s => s.DeleteShoppingList(It.IsAny<int>(), It.IsAny<int>()));
            _mockService.Setup(s => s.GetAllUserShoppingListsByUserId(It.IsAny<int>())).Returns(new List<ShoppingListReadDTO>() { returnReadDTO });
            _mockService.Setup(s => s.GetShoppingListByUserIdAndListId(It.IsAny<int>(), It.IsAny<int>())).Returns(returnReadDTO);

            //Inject mocked service
            _controller = new ShoppingListController(_mockService.Object);
        }

        [Fact]
        public void ShouldCallCreateShoppingListOnServiceWhenUsingCreateShoppingList()
        {
            _controller.CreateShoppingList(createDTO);
            _mockService.Verify(s => s.CreateShoppingList(It.IsAny<int>(), It.IsAny<ShoppingListCreateUpdateDTO>()), Times.Once());
        }

        [Fact]
        public void ShouldReturnShoppingListReadDTOWhenUsingCreateShoppingList()
        {
            var newList = _controller.CreateShoppingList(createDTO);
            Assert.True(newList.Value.ShoppingListID == readDTO.ShoppingListID);
        }

        [Fact]
        public void ShouldReturnShoppingListReadDTOWhenUsingUpdateShoppingList()
        {
            var newList = _controller.UpdateShoppingList(shoppingListId, createDTO);
            Assert.True(newList.Value.ShoppingListID == readDTO.ShoppingListID);
        }

        [Fact]
        public void ShouldCallDeleteOnServiceWhenUsingDeleteShoppingList()
        {
            _controller.DeleteShoppingList(shoppingListId);
            _mockService.Verify(s => s.DeleteShoppingList(It.IsAny<int>(), It.IsAny<int>()), Times.Once());
        }

        [Fact]
        public void ShouldReturnNoContentWhenUsingDeleteShoppingList()
        {
            var result = _controller.DeleteShoppingList(shoppingListId);
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void ShouldReturnListOfShoppingListReadDTOWhenUsingFindUserShoppingLists()
        {
            var result = _controller.GetAllUserShoppingLists();
            Assert.True(result.Value.Count == 1);
        }

        [Fact]
        public void ShouldReturnShoppingListReadDTOWhenUsingFindUserShoppingListsById()
        {
            var result = _controller.GetShoppingListsById(shoppingListId);
            Assert.True(result.Value.ShoppingListID == readDTO.ShoppingListID);
        }

    }
}
