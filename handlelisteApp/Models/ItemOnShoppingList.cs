using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class ItemOnShoppingList
    {
        public int Id { get; set; }
        public int ShoppingListId { get; set; }
        public ShoppingList ShoppingList { get; set; }
        public int ItemId { get; set; }
        public virtual Item Item { get; set; }
        public int Quantity { get; set; }
        public bool HasBeenBought { get; set; }
        public string ItemIdentifier { get; set; }
        public int Order { get; set; }
    }
}
