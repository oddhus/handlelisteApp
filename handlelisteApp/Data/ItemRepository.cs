using System;
using System.Collections.Generic;
using handlelisteApp.Context;
using handlelisteApp.Models;
using System.Linq;

namespace handlelisteApp.Data
{
    public class ItemRepository : IItemRepository
    {

        private readonly ShoppingListContext _context;

        public ItemRepository(ShoppingListContext context)
        {
            _context = context;
        }

        public void AddItem(Item item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item));
            }
            _context.Items.Add(item);
        }

        public void AddItems(List<Item> items)
        {
            _context.Items.AddRange(items);
        }

        public Item FindByItemName(string itemName)
        {
            return _context.Items.Where(i => i.ItemName == itemName).FirstOrDefault();
        }

        public void DeleteItem(Item item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item));
            }
            _context.Items.Remove(item);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
