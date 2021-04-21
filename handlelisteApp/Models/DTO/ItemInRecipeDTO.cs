using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    [ExcludeFromCodeCoverage]
    public class ItemInRecipeDTO
    {
        public string ItemName { get; set; }
        public float Quantity { get; set; }
        public string Unit { get; set; }
    }
}
