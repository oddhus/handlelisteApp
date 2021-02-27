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
        private ShoppingListCreateDTO createDTO;
        private ShoppingListReadDTO readDTO;


        public ShoppingListControllerTests()
        {
            //Create two test objects
            createDTO = new ShoppingListCreateDTO()
            {
                Items = new List<ItemOnShoppingListDTO>(){
                    new ItemOnShoppingListDTO()
                    {
                        ItemId = 123,
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
                        ItemId = 123,
                        Quantity = 2
                    }
                }
            };

            //Mock service
            _mockService = new Mock<IShoppingListService>();
            _mockService.Setup(s => s.CreateShoppingList(It.IsAny<int>(), It.IsAny<ShoppingListCreateDTO>())).Returns(readDTO);

            //Inject mocked service
            _controller = new ShoppingListController(_mockService.Object);
        }

        [Fact]
        public void ShouldCallCreateShoppingListOnServiceWhenUsingCreateShoppingList()
        {
            _controller.CreateShoppingList(createDTO);
            _mockService.Verify(s => s.CreateShoppingList(It.IsAny<int>(), It.IsAny<ShoppingListCreateDTO>()), Times.Once());
        }

        [Fact]
        public void ShouldReturnShoppingListReadDTOWhenUsingCreateShoppingList()
        {
            var newList = _controller.CreateShoppingList(createDTO);
            Assert.StrictEqual(newList, readDTO);
        }

    }
}
