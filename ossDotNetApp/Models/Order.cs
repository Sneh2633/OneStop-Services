using System;
using System.Collections.Generic;

namespace ossDotNetApp.Models
{
    public partial class Order
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int VendorId { get; set; }
        public int ServiceId { get; set; }
        public DateTime BookingDatetime { get; set; }
        public sbyte Status { get; set; }

        public virtual Customer Customer { get; set; } = null!;
        public virtual Category Service { get; set; } = null!;
        public virtual Vendor Vendor { get; set; } = null!;
    }
}
