using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class ShoppingList
    {
        public int ShoppingListID { get; set; }
        public virtual ICollection<Item> Items { get; set; }
        
    }
}
