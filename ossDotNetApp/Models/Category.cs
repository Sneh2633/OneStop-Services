using System;
using System.Collections.Generic;

namespace ossDotNetApp.Models
{
    public partial class Category
    {
        public Category()
        {
            Orders = new HashSet<Order>();
            Services = new HashSet<Service>();
            Vendors = new HashSet<Vendor>();
        }

        public int ServiceId { get; set; }
        public string ServiceName { get; set; } = null!;

        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Service> Services { get; set; }
        public virtual ICollection<Vendor> Vendors { get; set; }
    }
}
