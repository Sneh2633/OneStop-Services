using System;
using System.Collections.Generic;

namespace ossDotNetApp.Models
{
    public partial class Service
    {
        public Service()
        {
            Orders = new HashSet<Order>();
            ServiceCosts = new HashSet<ServiceCost>();
        }

        public int ServiceId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int? CategoryId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ServiceCost> ServiceCosts { get; set; }
    }
}
