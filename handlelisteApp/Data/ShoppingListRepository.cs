using System.Collections.Generic;
using handlelisteApp.Context;
using handlelisteApp.Models;

namespace handlelisteApp.Data
{
    public class ShoppingListRepository : IShoppingListRepository
    {

        private readonly ShoppingListContext _context;

        public ShoppingListRepository(ShoppingListContext context)
        {
            _context = context;
        }


        public bool SaveChanges()
        {
            return _context.SaveChanges() > 0;
        }

        public void AddShoppingList(ShoppingList shoppingList)
        {
            _context.ShoppingLists.Add(shoppingList);
        }

        public ShoppingList AddItemsToShoppingList(int id, List<ItemOnShoppingList> items)
        {
            return null;
        }
    }
}