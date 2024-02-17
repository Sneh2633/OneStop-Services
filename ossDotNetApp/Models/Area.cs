using System;
using System.Collections.Generic;

namespace ossDotNetApp.Models
{
    public partial class Area
    {
        public int AreaId { get; set; }
        public string AreaName { get; set; } = null!;
        public int CityId { get; set; }

        public virtual City City { get; set; } = null!;
    }
}
