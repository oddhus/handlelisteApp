using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    public class ShoppingListCreateUpdateDTO
    {
        public ICollection<ItemOnShoppingListCreateDTO> Items { get; set; }
    }
}
