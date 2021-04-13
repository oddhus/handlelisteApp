using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    public class SavedRecipeDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string RecipeId { get; set; }
        public DateTime likedOn { get; set; }
    }
}
