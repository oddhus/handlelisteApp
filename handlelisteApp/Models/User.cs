using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class User
    {
        public int UserID { get; set; }
        public String Username { get; set; }

        public String HashedPassword { get; set; }
        public int UserAge { get; set; }
        public ICollection<ShoppingList> ShoppingLists { get; set; }
        
    }
}
