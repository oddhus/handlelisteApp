using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    public class ShoppingListCreateDTO
    {
        public int UserID { get; set; }
        public ICollection<ItemOnShoppingListDTO> Items { get; set; }
    }
}
