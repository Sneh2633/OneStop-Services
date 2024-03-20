using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ossDotNetApp.Models
{
    public partial class User
    {
        public User()
        {
            Vendors = new HashSet<Vendor>();
        }

        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int Roleid { get; set; }
        public ulong Status { get; set; }

        public void SetStatus(ulong status)
        {
            this.Status = status;
        }
        //[JsonIgnore]
        public virtual Role Role { get; set; } = null!;
        //[JsonIgnore]
        public virtual Customer? Customer { get; set; }
        //[JsonIgnore]
        public virtual ICollection<Vendor> Vendors { get; set; }
    }
}
