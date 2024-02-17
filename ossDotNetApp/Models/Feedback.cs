using System;
using System.Collections.Generic;

namespace ossDotNetApp.Models
{
    public partial class Feedback
    {
        public int FeedbackId { get; set; }
        public string Feedback1 { get; set; } = null!;
        public int Rating { get; set; }
        public int VendorId { get; set; }
        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; } = null!;
        public virtual Vendor Vendor { get; set; } = null!;
    }
}
