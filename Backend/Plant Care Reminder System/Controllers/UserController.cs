﻿using Microsoft.AspNetCore.Mvc;
using Plant_Care_Reminder_System.Dtos;
using Plant_Care_Reminder_System.Services;

namespace Plant_Care_Reminder_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserAddService _userService;
        public UserController(IUserAddService UserAddService) 
        {
            _userService = UserAddService;
        }

        [HttpPost("UserAdd")]
        public async Task<IActionResult> AddUser([FromBody] UserDto user)
        {
            bool success = await _userService.AddUserAsync(user.Username, user.Email, user.Password);
            if (success)
                return Ok("User added successfully.");
            return BadRequest("Failed to add user.");
        }

    }

    
}
