using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    public class ItemOnShoppingListReadDTO
    {
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public string Measurement { get; set; }
    }
}
