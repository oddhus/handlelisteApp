using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class ItemInMyKitchen
    {
        public int ItemID { get; set; }
        public Item Item { get; set; }
        public int MyKitchenID { get; set; }
        public MyKitchen MyKitchen { get; set; }
        public int Quantity { get; set; }
    }
}
