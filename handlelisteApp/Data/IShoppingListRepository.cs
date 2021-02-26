using System.Collections.Generic;
using handlelisteApp.Models;

namespace handlelisteApp.Data
{
    public interface IShoppingListRepository
    {
        bool SaveChanges();
        void AddShoppingList(ShoppingList shoppingList);
        void UpdateShoppingList(ShoppingList shoppingList);
        void DeleteShoppingList(ShoppingList shoppingList);
        ShoppingList FindShoppingListById(int id);
        List<ShoppingList> FindShoppingListByUserId(int id);
    }
}