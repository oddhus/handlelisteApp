using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class MyKitchen
    {
        public int MyKitchenID { get; set; }
        public ICollection<ItemInMyKitchen> ItemsInMyKitchen { get; set; }
        public int UserID { get; set; }
        public User User { get; set; } // Owner of kitchen
    }
}
