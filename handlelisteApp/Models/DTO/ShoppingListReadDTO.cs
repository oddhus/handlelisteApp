using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    public class ShoppingListReadDTO
    {
        public string Name { get; set; }
        public int ShoppingListID { get; set; }
        public List<ItemOnShoppingListReadDTO> Items { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
