using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class Recipe
    {
        public int RecipeID { get; set; }
        public string RecipeName { get; set; }
        public string ShortDescription { get; set; }
        public string Approach { get; set; }
        public ICollection<ItemInRecipe> Items { get; set; }
    }
}
