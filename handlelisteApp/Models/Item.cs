using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    [ExcludeFromCodeCoverage]
    public class Item
    {
        public int ItemID { get; set; }
        public String ItemName { get; set; }
        public double Weight { get; set; }
    }
}
