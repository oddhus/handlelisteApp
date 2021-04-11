using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using handlelisteApp.Data;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;

namespace handlelisteApp.Services
{
    public class ShoppingListService : IShoppingListService
    {
        private readonly IShoppingListRepository _shoppingListRepo;
        private readonly IItemRepository _itemRepo;
        private readonly IMapper _mapper;

        public ShoppingListService(IShoppingListRepository shoppingListRepo, IItemRepository itemRepo, IMapper mapper)
        {
            _shoppingListRepo = shoppingListRepo;
            _itemRepo = itemRepo;
            _mapper = mapper;
        }

        public ShoppingListReadDTO CreateShoppingList(int userID, ShoppingListCreateUpdateDTO shoppingListDTO)
        {
            ShoppingList shoppingList = new ShoppingList()
            {
                Name = shoppingListDTO.Name,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                UserId = userID,
                Items = new List<ItemOnShoppingList>()
            };

            //Add all items in a join table
            foreach (var item in shoppingListDTO.Items)
            {
                var foundItem = _itemRepo.FindByItemName(item.ItemName);

                if (foundItem == null)
                {
                    foundItem = new Item() { ItemName = item.ItemName };
                    _itemRepo.AddItem(foundItem);
                }

                shoppingList.Items.Add(new ItemOnShoppingList()
                {
                    ItemId = foundItem.ItemID,
                    Item = foundItem,
                    ShoppingListId = shoppingList.ShoppingListID,
                    Quantity = item.Quantity,
                    HasBeenBought = item.HasBeenBought,
                    ItemIdentifier = item.ItemIdentifier
                }); ;
            }

            _shoppingListRepo.AddShoppingList(shoppingList);
            _shoppingListRepo.SaveChanges();

            return _mapper.Map<ShoppingListReadDTO>(shoppingList);
        }

        public ShoppingListReadDTO UpdateShoppingList(int userId, int shoppingListId, ShoppingListCreateUpdateDTO shoppingListDTO)
        {
            var shoppingList = _shoppingListRepo.FindShoppingListByUserIdAndListId(userId, shoppingListId);

            if (shoppingList == null || shoppingList.UserId != userId)
            {
                return null;
            }

            shoppingList.Items = new List<ItemOnShoppingList>();
            shoppingList.UpdatedOn = DateTime.Now;
            shoppingList.Name = shoppingListDTO.Name;

            foreach (var item in shoppingListDTO.Items)
            {
                var foundItem = _itemRepo.FindByItemName(item.ItemName);

                if (foundItem == null)
                {
                    foundItem = new Item() { ItemName = item.ItemName };
                    _itemRepo.AddItem(foundItem);
                }

                shoppingList.Items.Add(new ItemOnShoppingList()
                {
                    ItemId = foundItem.ItemID,
                    Item = foundItem,
                    ShoppingListId = shoppingList.ShoppingListID,
                    Quantity = item.Quantity,
                    HasBeenBought = item.HasBeenBought,
                    ItemIdentifier = item.ItemIdentifier
                });
            }

            _shoppingListRepo.UpdateShoppingList(shoppingList);
            _shoppingListRepo.SaveChanges();

            return _mapper.Map<ShoppingListReadDTO>(shoppingList);
        }

        public ItemOnShoppingListReadDTO UpdateOrCreateItemOnShoppingList(int userId, int shoppingListId, ItemOnShoppingListCreateDTO itemDto)
        {
            var shoppingList = _shoppingListRepo.FindShoppingListByUserIdAndListId(userId, shoppingListId);
            if (shoppingList == null || shoppingList.UserId != userId)
            {
                return null;
            }

            var foundItem = _itemRepo.FindByItemName(itemDto.ItemName);
            if (foundItem == null)
            {
                foundItem = new Item() { ItemName = itemDto.ItemName };
                _itemRepo.AddItem(foundItem);
            }

            var itemInShoppingList = shoppingList.Items.FirstOrDefault(i => i.ItemIdentifier == itemDto.ItemIdentifier);
            if (itemInShoppingList != null)
            {
                itemInShoppingList.HasBeenBought = itemDto.HasBeenBought;
                itemInShoppingList.Quantity = itemDto.Quantity;
                itemInShoppingList.Item = foundItem;
            }
            else
            {
                itemInShoppingList = new ItemOnShoppingList()
                {
                    ItemId = foundItem.ItemID,
                    Item = foundItem,
                    ShoppingListId = shoppingList.ShoppingListID,
                    Quantity = itemDto.Quantity,
                    HasBeenBought = itemDto.HasBeenBought,
                    ItemIdentifier = itemDto.ItemIdentifier
                };
                shoppingList.Items.Add(itemInShoppingList);
            };

            _shoppingListRepo.SaveChanges();
            return _mapper.Map<ItemOnShoppingListReadDTO>(itemInShoppingList);
        }

        public void DeleteItemOnShoppingList(int userId, int shoppingListId, string itemIdentifier)
        {
            var shoppingList = _shoppingListRepo.FindShoppingListByUserIdAndListId(userId, shoppingListId);
            if (shoppingList == null || shoppingList.UserId != userId)
            {
                return;
            }

            var itemToRemove = shoppingList.Items.FirstOrDefault(i => i.ItemIdentifier == itemIdentifier);

            if (itemIdentifier == null)
            {
                return;
            }

            shoppingList.Items.Remove(itemToRemove);
            _shoppingListRepo.SaveChanges();
        }

        public ShoppingListReadDTO GetShoppingListByUserIdAndListId(int userId, int shoppingListId)
        {
            return _mapper.Map<ShoppingListReadDTO>(_shoppingListRepo.FindShoppingListByUserIdAndListId(userId, shoppingListId));
        }
        public List<ShoppingListReadDTO> GetAllUserShoppingListsByUserId(int userId)
        {
            return _mapper.Map<List<ShoppingListReadDTO>>(_shoppingListRepo.FindShoppingListsByUserId(userId));
        }
        public void DeleteShoppingList(int userId, int shoppingListId)
        {
            var list = _shoppingListRepo.FindShoppingListByUserIdAndListId(userId, shoppingListId);
            if (list != null)
            {
                _shoppingListRepo.DeleteShoppingList(list);
                _shoppingListRepo.SaveChanges();
            }
        }
    }
}