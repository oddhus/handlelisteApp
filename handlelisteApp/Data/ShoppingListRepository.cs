using System;
using System.Collections.Generic;
using handlelisteApp.Context;
using handlelisteApp.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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
            if (shoppingList == null)
            {
                throw new ArgumentNullException(nameof(shoppingList));
            }
            _context.ShoppingLists.Add(shoppingList);
        }

        public void UpdateShoppingList(ShoppingList shoppingList)
        {

        }

        public void DeleteShoppingList(ShoppingList shoppingList)
        {
            if (shoppingList == null)
            {
                throw new ArgumentNullException(nameof(shoppingList));
            }
            _context.ShoppingLists.Remove(shoppingList);
        }

        public ShoppingList FindShoppingListByUserIdAndListId(int userId, int shoppingListId)
        {
            return _context.ShoppingLists
                .Where(s => s.ShoppingListID == shoppingListId && s.UserId == userId)
                .Include(s => s.Items)
                .ThenInclude(iir => iir.Item)
                .FirstOrDefault();
        }


        public IEnumerable<ShoppingList> FindShoppingListsByUserId(int userId)
        {
            return _context.ShoppingLists
                .Where(s => s.UserId == userId)
                .Include(s => s.Items)
                .ThenInclude(iir => iir.Item)
                .ToList();
        }


    }
}