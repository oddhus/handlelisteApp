using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    public class RecipeDTO
    {
        public int RecipeID { get; set; }
        public string RecipeName { get; set; }
        public string ShortDescription { get; set; }
        public string Approach { get; set; }
        public List<ItemInRecipeDTO> Items { get; set; }
    }
}
