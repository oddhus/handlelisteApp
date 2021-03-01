using System.Collections.Generic;
using handlelisteApp.Models;

namespace handlelisteApp.Data
{
    public interface IItemRepository
    {
        bool SaveChanges();
        Item FindByItemName(string itemName);
        void AddItem(Item item);
        void AddItems(List<Item> items);
        void DeleteItem(Item item);
    }
}