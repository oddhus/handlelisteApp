using System.Collections.Generic;
using handlelisteApp.Models.DTO;

namespace handlelisteApp.Data
{
    public interface IShoppingListService
    {
        ShoppingListReadDTO GetShoppingListByUserIdAndListId(int userId, int shoppingListId);
        List<ShoppingListReadDTO> GetAllUserShoppingListsByUserId(int userId);
        ShoppingListReadDTO CreateShoppingList(int userId, ShoppingListCreateUpdateDTO shoppingListDTO);
        ShoppingListReadDTO UpdateShoppingList(int userId, int shoppingListId, ShoppingListCreateUpdateDTO shoppingListDTO);
        void DeleteShoppingList(int userId, int shoppingListId);
    }
}