using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    [ExcludeFromCodeCoverage]
    public class ItemInRecipe
    {
        public int RecipeID { get; set; }
        public Recipe Recipe { get; set; }
        public int ItemID { get; set; }
        public Item Item { get; set; }
        public float Quantity { get; set; }
        public string Unit { get; set; }
        public string Category { get; set; }
    }
}
