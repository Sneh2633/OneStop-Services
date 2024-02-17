using System;
using System.Collections.Generic;

namespace ossDotNetApp.Models
{
    public partial class Vendor
    {
        public Vendor()
        {
            Feedbacks = new HashSet<Feedback>();
            Orders = new HashSet<Order>();
            ServiceCosts = new HashSet<ServiceCost>();
        }

        public int VendorId { get; set; }
        public int UserId { get; set; }
        public string Fname { get; set; } = null!;
        public string Lname { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string ContactNumber { get; set; } = null!;
        public int? Serviceid { get; set; }

        public virtual Category? Service { get; set; }
        public virtual User User { get; set; } = null!;
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ServiceCost> ServiceCosts { get; set; }
    }
}
