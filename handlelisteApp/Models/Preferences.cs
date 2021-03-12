using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class Preferences
    {
        public int PreferencesID { get; set; }
        public string Language { get; set; }
        public bool Darkmode { get; set; }
        public int Fontsize { get; set; }
    }
}
