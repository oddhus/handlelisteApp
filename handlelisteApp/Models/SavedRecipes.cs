using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    [ExcludeFromCodeCoverage]
    public class SavedRecipe
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public int? RecipeId { get; set; }
        public virtual Recipe Recipe { get; set; }
        public DateTime likedOn { get; set; }
    }
}
