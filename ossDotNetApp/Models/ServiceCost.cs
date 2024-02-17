using System;
using System.Collections.Generic;

namespace ossDotNetApp.Models
{
    public partial class ServiceCost
    {
        public int ServiceCostid { get; set; }
        public decimal Cost { get; set; }
        public int ServiceId { get; set; }
        public int VendorId { get; set; }

        public virtual Service Service { get; set; } = null!;
        public virtual Vendor Vendor { get; set; } = null!;
    }
}
