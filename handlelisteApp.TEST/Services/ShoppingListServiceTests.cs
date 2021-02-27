using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using handlelisteApp.Context;
using handlelisteApp.Data;
using handlelisteApp.Mappings.Profiles;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using handlelisteApp.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;


namespace handlelisteApp.TEST.Data
{

    public class ShoppingListServiceTests
    {
        private Mock<IShoppingListRepository> _mockRepo;
        private ShoppingListService _service;
        private ShoppingListCreateDTO createDTO;
        public ShoppingListServiceTests()
        {
            //Configure mapper
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new ShoppingListProfile());
                mc.AddProfile(new ItemOnShoppingListProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();

            //Create input
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

            //mock repo
            _mockRepo = new Mock<IShoppingListRepository>();

            _service = new ShoppingListService(_mockRepo.Object, mapper);
        }

        [Fact]
        public void ShouldCallAddShoppingListOnRepoWhenUsingCreateShoppingList()
        {
            _service.CreateShoppingList(1, createDTO);
            _mockRepo.Verify(m => m.AddShoppingList(It.IsAny<ShoppingList>()), Times.Once());
        }

        [Fact]
        public void ShouldCallSaveChangesOnRepoWhenUsingCreateShoppingList()
        {
            _service.CreateShoppingList(1, createDTO);
            _mockRepo.Verify(m => m.SaveChanges(), Times.Once());
        }

        [Fact]
        public void ShouldReturnShoppingListReadDTOWhenCreatingShoppingList()
        {
            var retValue = _service.CreateShoppingList(1, createDTO);
            Assert.NotNull(retValue);
            Assert.NotNull(createDTO.Items.FirstOrDefault(i => i.ItemId == retValue.Items[0].ItemId));
        }
    }
}
