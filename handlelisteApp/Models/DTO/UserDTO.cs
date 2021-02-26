using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models.DTO
{
    public class UserDTO
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public int UserAge { get; set; }
        public ICollection<ShoppingList> ShoppingLists { get; set; }
    }
}
