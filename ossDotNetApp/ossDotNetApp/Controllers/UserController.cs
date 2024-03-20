using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ossDotNetApp.Models;
using System.Linq.Expressions;

namespace ossDotNetApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        [HttpPut("{id}")]
        public IActionResult UpdateStatus(int id)
        {
            try
            {
                var _ossdbContext = new ossdbContext();
                var vendor = _ossdbContext.Vendors.Find(id);
                var user = _ossdbContext.Users.Find(vendor.UserId);


                user.Status = 1;


                _ossdbContext.SaveChanges();
                return NoContent();
            }

            catch (Exception ex)
            {

                return StatusCode(500, "Internal Server error");
            }
        }
    }
}
