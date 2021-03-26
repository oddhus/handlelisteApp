using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class ShoppingList
    {
        public int ShoppingListID { get; set; }
        public virtual ICollection<ItemOnShoppingList> Items { get; set; }
        public int UserId { get; set; }
        public User user { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
