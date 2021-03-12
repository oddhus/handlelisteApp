using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class ItemInRecipe
    {
        public int RecipeID { get; set; }
        public Recipe Recipe {get; set;}
        public int ItemID { get; set; }
        public Item Item { get; set; }
        public int Quantiy { get; set; }
        public string Unit { get; set; }
    }
}
