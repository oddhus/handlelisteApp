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
        public string ImgUrl { get; set; }
        public List<ItemInRecipe> Items { get; set; }
        public User user { get; set; }
        public int UserID { get; set; }
        public ICollection<SavedRecipe> UserSaved { get; set; }
    }
}
