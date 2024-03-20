using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ossDotNetApp.Models;

namespace ossDotNetApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubServiceController : ControllerBase
    {
        [HttpPost]
        public string SubService(Service service)

        {
            using (var db = new ossdbContext())
            {
                Category cat = db.Categories.Find(service.CategoryId);
                if (cat != null) { return "catagory not found"; }
                db.Services.Add(service);
                db.SaveChanges();
            }
            return "added successfully";

        }
    }
}
