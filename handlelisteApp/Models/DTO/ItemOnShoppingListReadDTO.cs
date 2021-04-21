using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    [ExcludeFromCodeCoverage]
    public class ItemOnShoppingListReadDTO
    {
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public bool HasBeenBought { get; set; }
        public string Category { get; set; }
        public string ItemIdentifier { get; set; }
        public int Order { get; set; }
    }
}
