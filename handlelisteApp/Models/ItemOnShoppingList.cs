using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class ItemOnShoppingList
    {
        public int ShoppingListId { get; set; }
        public ShoppingList ShoppingList { get; set; }
        public int ItemId { get; set; }
        public virtual Item Item { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; }
    }
}
