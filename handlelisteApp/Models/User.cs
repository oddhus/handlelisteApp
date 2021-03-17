using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }

        public string HashedPassword { get; set; }
        public int UserAge { get; set; }
        public ICollection<ShoppingList> ShoppingLists { get; set; }
        public string EmailAdress { get; set; }
        public Preferences Preferences { get; set; }
        public MyKitchen MyKitchen { get; set; }
        public ICollection<Recipe> Recipes { get; set; }
    }
}
