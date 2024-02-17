using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ossDotNetApp.Models;

namespace ossDotNetApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        [HttpPost]
        public IActionResult SaveCat(Category c)
        {
            try
            {
                _db.Categories.Add(c);
                _db.SaveChanges();
                return Ok("Category added successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add category: {ex.Message}");
            }
        }
    }
}
