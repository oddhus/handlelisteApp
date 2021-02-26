using System.Collections.Generic;
using handlelisteApp.Models;

namespace handlelisteApp.Data
{
    public interface IShoppingListRepository
    {
        bool SaveChanges();
        void AddShoppingList(ShoppingList shoppingList);
        ShoppingList AddItemsToShoppingList(int id, List<ItemOnShoppingList> items);
    }
}