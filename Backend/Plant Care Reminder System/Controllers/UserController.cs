using Microsoft.AspNetCore.Mvc;
using Plant_Care_Reminder_System.Dtos;
using Plant_Care_Reminder_System.Services;

namespace Plant_Care_Reminder_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserAddService _userService;
        private readonly ITotalCountService _totalCountService;

        public UserController(IUserAddService UserAddService, ITotalCountService TotalCountService) 
        {
            _userService = UserAddService;
            _totalCountService = TotalCountService;
        }

        [HttpPost("UserAdd")]
        public async Task<IActionResult> AddUser([FromBody] UserDto user)
        {
            bool success = await _userService.AddUserAsync(user.Username, user.Email, user.Password);
            if (success)                
                return Ok("User added successfully.");
            return BadRequest("Failed to add user.");
        }


        [HttpGet("GetStats")]
        public async Task<IActionResult> GetStatistics()
        {
            int userCount = await _totalCountService.GetTotalUsersAsync();
            int plantCount = await _totalCountService.GetTotalPlantsAsync();

            return Ok(new
            {
                totalUsers = userCount,
                totalPlants = plantCount
            });
        }

    }


}
