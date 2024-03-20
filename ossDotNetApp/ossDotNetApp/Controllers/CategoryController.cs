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
        public string SaveCat(Category cat)
        {
            using(var sw=new ossdbContext()) 
            {
                sw.Categories.Add(cat);
                sw.SaveChanges();
            }
            return "Category Saved Successfully";
        }

       

       
    }
}
