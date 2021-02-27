using System;
using System.Collections.Generic;
using AutoMapper;
using handlelisteApp.Data;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;

namespace handlelisteApp.Services
{
    public class ShoppingListService
    {
        private readonly IShoppingListRepository _shoppingListRepo;
        private readonly IMapper _mapper;

        public ShoppingListService(IShoppingListRepository shoppingListRepo, IMapper mapper)
        {
            _shoppingListRepo = shoppingListRepo;
            _mapper = mapper;
        }

        public ShoppingListReadDTO CreateShoppingList(int userID, ShoppingListCreateDTO shoppingListDTO)
        {
            ShoppingList shoppingList = new ShoppingList()
            {
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                UserId = userID,
                Items = new List<ItemOnShoppingList>()
            };

            //Add all items in a join table
            foreach (var item in shoppingListDTO.Items)
            {
                shoppingList.Items.Add(new ItemOnShoppingList()
                {
                    ItemId = item.ItemId,
                    ShoppingListId = shoppingList.ShoppingListID,
                    Quantity = item.Quantity,
                    Measurement = item.Measurement
                });
            }

            _shoppingListRepo.AddShoppingList(shoppingList);
            _shoppingListRepo.SaveChanges();

            return _mapper.Map<ShoppingListReadDTO>(shoppingList);
        }


    }
}