using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    public class ItemOnShoppingListCreateDTO
    {
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public bool HasBeenBought { get; set; }
        public string ItemIdentifier { get; set; }
        public int Order { get; set; }
    }
}
