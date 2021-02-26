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

        public ShoppingList FindShoppingListById(int id)
        {
            return _context.ShoppingLists
                .Where(s => s.ShoppingListID == id)
                .Include(s => s.Items)
                .FirstOrDefault();
        }


        public List<ShoppingList> FindShoppingListByUserId(int id)
        {
            return _context.ShoppingLists
                .Where(s => s.UserId == id)
                .ToList();
        }


    }
}