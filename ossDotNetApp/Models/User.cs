using System;
using System.Collections.Generic;

namespace ossDotNetApp.Models
{
    public partial class User
    {
        public User()
        {
            Customers = new HashSet<Customer>();
            Vendors = new HashSet<Vendor>();
        }

        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int Roleid { get; set; }
        public ulong Status { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<Customer> Customers { get; set; }
        public virtual ICollection<Vendor> Vendors { get; set; }
    }
}
